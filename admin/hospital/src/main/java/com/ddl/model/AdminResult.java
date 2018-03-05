package com.ddl.model;

public class AdminResult<T, U> {
	private int ret;

	private T info;
	
	private U rows;
	
	public AdminResult()
	{
		this.ret = 0;
	}
	
	public U getRows() {
		return rows;
	}

	public void setRows(U rows) {
		this.rows = rows;
	}

	public AdminResult(Integer ret, T info, U rows)
	{
		this.ret = ret;
		this.info = info;
		this.rows = rows;
	}
	
	public int getRet() {
		return ret;
	}

	public void setRet(int ret) {
		this.ret = ret;
	}

	public T getInfo() {
		return info;
	}
	public void setInfo(T info) {
		this.info = info;
	}
}
