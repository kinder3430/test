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
@Table(name = "sys_role_menu")
public class SysRoleMenuBean {
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private int role_menu_id;
	  
	  public int getRole_menu_id() {
		return role_menu_id;
	}

	public void setRole_menu_id(int role_menu_id) {
		this.role_menu_id = role_menu_id;
	}

	public int getRole_id() {
		return role_id;
	}

	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}

	public int getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public boolean isDelflag() {
		return delflag;
	}

	public void setDelflag(boolean delflag) {
		this.delflag = delflag;
	}

	public Date getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}

	public String getMenu_title() {
		return menu_title;
	}

	public void setMenu_title(String menu_title) {
		this.menu_title = menu_title;
	}

	private int role_id;
	  
	  private int menu_id;
	  
	private String menu_title;

	  private int status;
	  
	  private boolean delflag;
	  
	  private Date create_date;
}
