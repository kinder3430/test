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
@Table(name = "sys_role")
public class RoleBean {
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private int role_id;
	  
	private String role_name;
	
	private String role_desc;
	
	private int status;
	
	public int getRole_id() {
		return role_id;
	}

	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	public String getRole_desc() {
		return role_desc;
	}

	public void setRole_desc(String role_desc) {
		this.role_desc = role_desc;
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

	private boolean delflag;
	
	private Date create_date;
}
