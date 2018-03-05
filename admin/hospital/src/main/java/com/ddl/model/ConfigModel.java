package com.ddl.model;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


public final class ConfigModel {
	
	// 获取文件上传目录
	//private static String pathUploadWin = "c:/xdbdata/upload/";
	private static String pathUploadWin = "c:/cn100data/upload/";
	private static String pathUploadLinux = "/opt/data/upload/";
	
	public static String getPathUpload() {
		String pathUpload = "";
		if ("\\".equals(File.separator)) {
			pathUpload = pathUploadWin;
		} else if ("/".equals(File.separator)) {
			pathUpload = pathUploadLinux;
		}
		return pathUpload;
	}

}
