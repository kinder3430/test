package com.ddl.admin.bean;


import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.FieldResult;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Formula;
import org.springframework.data.jpa.repository.Query;

@Entity
//@AttributeOverride(name="ptitle", column=@Column(name="ptitle1"))
@Table(name = "sys_menus")
public class SysMenuBean {
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private int id;
	  
	  public String getPtitle() {
		return ptitle;
	}

	@NotNull
	  private int type;

	  private String ptitle;
	  
	  private String title;
	  
	  private String link_url;

	  public String getLink_url() {
		return link_url;
	}

	public void setLink_url(String link_url) {
		this.link_url = link_url;
	}

	private int pid;
	  
	  private int deep;
	  
	  private String pid_list;
	  
	  private int is_leaf;
	  
	  private int is_sys;
	  
	  private int sort_id;
	  
	  public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public int getDeep() {
		return deep;
	}

	public void setDeep(int deep) {
		this.deep = deep;
	}

	public String getPid_list() {
		return pid_list;
	}

	public void setPid_list(String pid_list) {
		this.pid_list = pid_list;
	}

	public int getIs_leaf() {
		return is_leaf;
	}

	public void setIs_leaf(int is_leaf) {
		this.is_leaf = is_leaf;
	}

	public int getIs_sys() {
		return is_sys;
	}

	public void setIs_sys(int is_sys) {
		this.is_sys = is_sys;
	}

	public int getSort_id() {
		return sort_id;
	}

	public void setSort_id(int sort_id) {
		this.sort_id = sort_id;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Date getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}

	public boolean isDelflag() {
		return delflag;
	}

	public void setDelflag(boolean delflag) {
		this.delflag = delflag;
	}

	private int status;
	  
	  @NotNull
	  private Date create_date;
	  
	  @NotNull
	  private boolean delflag;
	  
	  public List<SysMenuBean> getChilds() {
		return childs;
	}

	public void setChilds(List<SysMenuBean> childs) {
		this.childs = childs;
	}

	@Transient
	  private List<SysMenuBean> childs;
}
