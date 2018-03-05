import uiTool from '../customize/ui.tool';
import util from '../../scripts/customize/util';

var UiTool = function () {};

UiTool.prototype = {
	init: function () {
		throw new Error('init is an abstract method.');
	},
	_init: function(mainId,datagridConfig,dialogConfig) {
		var that = this;

		var formDialogConfig = {
			buttons: [
				{
					text: '保存',
					'class': "btn-success add edit",
					click: function () {
						that.saveForm();
					}
				},
				{
					text: "关闭",
					'class': "btn-default",
					click: function () {
						$(this).bsDialog("close");
					}
				}
			]
		};

		typeof dialogConfig == 'object' && $.extend(formDialogConfig,dialogConfig);

		that.selectDom(mainId);
		that.bindEvents();
		that.createModule(datagridConfig, formDialogConfig);
	},
	selectDom: function (mainId) {
		var that = this;
		var $main = $('#' + mainId);

		that.mainId				= mainId;
		that.$main       		= $main;
		that.$datagrid   		= $('.j-datagrid', $main);     //数据表格
		that.$formDialog		= $('.j-formDialog', $main);   //用作增改的dialog
		that.$form       		= $('.j-form', $main); 		//用作增改的form
		that.$addBtn     		= $('.j-add', $main);			//新建按钮
		that.$editBtn    		= $('.j-edit', $main);			//编辑按钮
		that.$delBtn     		= $('.j-del', $main);			//删除按钮
		that.$disBtn     		= $('.j-dis', $main);			//禁用按钮
		that.$lookBtn    		= $('.j-look', $main);			//预览按钮
		that.$searchBtn  		= $('.j-search', $main);		//查询按钮
		that.$updatePanelBtn  	= $('.j-updatePanel', $main);		//查询按钮
		that.$searchForm 		= $('.j-search-form', $main);  //查询form
		that.$exportBtn			= $('.j-export', $main);   //导出按钮

	},
	bindEvents: function () {
		var that = this;

		that.$main.data('vm', that);
		that.$addBtn.off('click').on('click', function () {
			that.showForm('Add')
		});
		that.$editBtn.off('click').on('click', function () {
			that.showForm('Edit')
		});
		that.$lookBtn.off('click').on('click', function () {
			that.showForm('Look')
		});
		that.$delBtn.off('click').on('click', function () {
			that.deleteItem()
		});
		that.$disBtn.off('click').on('click', function () {
			that.forbidden()
		});
		that.$searchBtn.off('click').on('click', function () {
			that.search();
		});
		that.$updatePanelBtn.off('click').on('click', function() {
			that.updatePanel($(this));
		});
		that.$form.off('submit').on('submit', function() {
			return false;
		});
		that.$searchForm.off('submit').on('submit', function() {
			that.$searchBtn.trigger('click');
			return false;
		});
		that.$exportBtn.off('click').on('click', function() {
			var href = $(this).data('href');
			var param = that.$searchForm.serialize();
			!!href && window.open(`${document.location.protocol}${util.getInterface(href)}?sessionid=${GV.sessionId}${param}&req_from=mj-backend`);
		});
	},
	createModule: function (datagridConfig,formDialogConfig) {
		var that = this;
		uiTool.createDialog(that.$formDialog, formDialogConfig);
		uiTool.createDatagrid(that.$datagrid, datagridConfig);

		that.validator = that.$form.validate();
	},

	showForm: function (mode, index, title) {
		var that = this,
			canOpen = true;
		var rows = [];

		mode = mode || 'Add';
		that.$form.bsForm('clear');

		if (mode != 'Add') {
			if('number' == typeof index) {
				rows[0] = that.getRowByIndex(index);
			} else {
				rows = that.getCheckedRows();
			}

			if (rows.length > 1) {
				$.layer.message('提示：','请单选进行编辑操作！', 'warning');
				return;
			}
		}

		var row = rows[0];
		row = that.reviseRowBeforeShowForm(mode, row) || row;
		that.$form.closest('.dialog').find('.add,.edit,.look').hide();
		switch (mode) {
			case 'Add':
				title = title || '新建';
				that.$form.closest('.dialog').find('.add').show();
				break;
			case 'Edit':
				title = title || '编辑';
				if (row) {
					that.$form.closest('.dialog').find('.edit').show();
					that.$form.bsForm('load', row);
				} else {
					$.layer.message('提示：','请选择需要编辑的记录！', 'warning');
					canOpen = false;
				}
				break;
			case 'Look':
				title = title || '查看';
				if (row) {
					that.$form.closest('.dialog').find('.look').show();
					that.$form.bsForm('load', row);
				} else {
					$.layer.message('提示：','请选择需要查看的记录！', 'warning');
					canOpen = false;
				}
				break;
		}

		if (canOpen) {
			that.validator.resetForm();
			that.$formDialog.bsDialog('setTitle', title).bsDialog('open');
			that.afterShowForm(mode, row);
			resizeDialog(that.$formDialog.closest('.dialog'));
		}

	},
	saveForm: function () {
		var that = this;
		that.beforeSaveForm();
		that.$form.bsForm('submit', {
			url: that.addOrEditAction,
			onSubmit: function (param) {
				that.validator.form();
				if (that.validator.valid()) {
					return that.beforeSubmit(param);
				} else {
					return false;
				}
			},
			success: function (result) {
				if (result.ret == 1) {
					that.hideForm();
					$.layer.message('提示：','保存成功！', 'success');
					that.$datagrid.datagrid('reload');
					that.afterSaveFormSuccess();
				} else {
					$.layer.message('提示：',result['info'], 'danger');
				}
			},
			error: function () {
				$.layer.message('提示：','服务器错误！', 'danger');
			}
		});
	},
	hideForm: function () {
		this.$formDialog.bsDialog('close');
	},
	deleteItem: function (index) {
		var that = this;
		var rows = [];

		if ('number' == typeof index) {
			rows[0] = that.getRowByIndex(index);
		} else {
			rows = that.getCheckedRows();
		}

		if (rows.length > 0) {
			var idStr = that.getIds(rows);
			$.layer.confirm('提示',
				'<div class="alert alert-warning">你确定需要删除选中的记录吗?</div>',
				function () {
					var obj = {};
					obj[that.id] = idStr;

					$.ajax({
						type: "post",
						url: that.deleteAction,
						dataType: 'json',
						data: obj,
						success: function (result) {
							if (result.ret == 1) {
								$.layer.message('提示：','刪除成功！', 'success');
								that.$datagrid.datagrid('reload');
							} else {
								$.layer.message('提示：',result.info, 'danger');
							}
						},
						error: function (err) {
							console.log(err);
							$.layer.message('提示：','服务器错误！', 'danger');
						}
					});
				});
		} else {
			$.layer.message('提示：','请选择需要删除的记录！', 'warning');
		}

	},
	forbidden: function () {
		var that = this;
		var rows = that.getCheckedRows();
		if (rows.length > 0) {
			var idStr = that.getIds(rows);
			var obj = {};
			obj[that.id] = idStr;

			$.ajax({
				type: "post",
				url: that.forbiddenAction,
				dataType: 'json',
				data: obj,
				success: function(result){
					if (result.ret == 1) {
						that.$datagrid.datagrid('reload');
					} else {
						$.layer.message('提示：',result['info'], 'danger');
					}
				},
				error: function (err) {
					console.log(err);
					$.layer.message('提示：','服务器错误！', 'danger');
				}
			});
		}
		else{
			$.layer.message('提示：','请选择需要禁用的记录！', 'warning');
		}
	},
	search: function () {
		var that = this;
		that.$datagrid.datagrid('load', that.getListAction + "?" + that.$searchForm.serialize());
	},

	updatePanel: function($dom) {
		var that = this;

		if(that.getCheckedRows().length > 1) {
			$.layer.message('提示：','多选状态下无法进行此操作！', 'warning');
			return;
		}
		if (!!$dom.data('needselect') && !that.getSelectedRow()) {
			$.layer.message('提示：','请选择一条记录！', 'warning');
			return;
		}

		$('.j-panel', that.$main).hide();
		$('.' + $dom.data('updatepanel')).show();
		var fnName = $dom.data('callback');
		if (!!fnName) {
			var fn = new Function('var that=this;that.'+fnName+'()');
			fn.call(that);
		}
	},

	getIds: function (rows) {
		var that = this,
			idStr = '';
		for (var i = 0, len = rows.length; i < len; i++) {
			var rowId = rows[i][that.id];
			idStr += rowId + ",";
		}
		return idStr.slice(0, idStr.length - 1);
	},
	getSelectedRow: function() {
		return this.$datagrid.datagrid('getSelected')
	},
	getCheckedRows: function() {
		return this.$datagrid.datagrid('getChecked')
	},
	getRowByIndex: function(index) {
		this.$datagrid.datagrid('unselectAll');
		return this.$datagrid.datagrid('getRows')[index];
	},

	bindMultiImg: function() {
		var that = this;
		$('.mutImg',that.$main).on('change', function() {
			var $this = $(this);
			var $valIpt = $this.parents('.form-group').find('.fileApi-valIpt');
			var imgPathArr = $this.val().split(',');
			var len = imgPathArr.length;
			for (var i=0;i<len;i++) {
				$valIpt.eq(i).val(imgPathArr[i]).trigger('change');
			}
		})
	},
	multiImgBeforeSaveForm: function() {
		var that = this;
		var $mutImg = $('.mutImg',that.$main);
		var $valIpt = $mutImg.parents('.form-group').find('.fileApi-valIpt');
		var len = $valIpt.length;
		var imgPathArr = [];
		for (var i=0;i<len;i++) {
			var val = $valIpt.eq(i).val();
			if (!!val) {
				imgPathArr.push(val);
			}
		}
		$mutImg.val(imgPathArr.join(','));
	},

	reviseRowBeforeShowForm: function (mode, row) {

	},
	afterShowForm: function (mode, row) {

	},
	beforeSaveForm: function() {

	},
	afterSaveFormSuccess: function () {

	},
	beforeSubmit: function(param) {

	},

	destroy: function() {
		this.ue && this.ue.destroy();
		this.onDestroy();
	},
	onDestroy: function () {

	}
};

module.exports = UiTool;