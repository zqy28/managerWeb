package com.vrimmer.bean.res;

import java.util.List;

import com.vrimmer.bean.AppRunLogs;
import com.vrimmer.bean.ResultCode;

public class AppRunLogs_res extends ResultCode {
	private int pageNum;
	List<AppRunLogs> appRunLogs;
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public List<AppRunLogs> getAppRunLogs() {
		return appRunLogs;
	}
	public void setAppRunLogs(List<AppRunLogs> appRunLogs) {
		this.appRunLogs = appRunLogs;
	}

}
