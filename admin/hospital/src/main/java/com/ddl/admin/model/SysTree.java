package com.ddl.admin.model;

import java.util.List;

public class SysTree {
	private boolean expanded;
	private boolean checked;
	private String text;
	public boolean isExpanded() {
		return expanded;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	private String id;
	private boolean leaf;
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<SysTree> getChildren() {
		return children;
	}
	public void setChildren(List<SysTree> children) {
		this.children = children;
	}
	private List<SysTree> children;
	public SysTree() {
		// TODO Auto-generated constructor stub
	}

}
