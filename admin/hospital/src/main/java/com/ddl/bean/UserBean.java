package com.ddl.bean;


import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

@Entity
@Table(name = "sp_user")
public class UserBean {
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private long id;
	  
	  @NotNull
	  private String user_login;
	  
	  @NotNull
	  private String user_nicename;
	  
	  @NotNull
	  private String avatar;
	  
	  @NotNull
	  private String password;
	  
	  public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	@NotNull
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

	private int role_id;
	  
	  private String role_name;
	  
	  @NotNull
	  private boolean delflag;
	  
	  public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUser_login() {
		return user_login;
	}

	public void setUser_login(String user_login) {
		this.user_login = user_login;
	}

	public String getUser_nicename() {
		return user_nicename;
	}

	public void setUser_nicename(String user_nicename) {
		this.user_nicename = user_nicename;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@NotNull
	  private Date create_date;
	  
	  @NotNull
	  private int type;	//1-普通用户,3-管理员
}
