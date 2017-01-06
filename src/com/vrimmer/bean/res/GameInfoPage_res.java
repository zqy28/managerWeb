package com.vrimmer.bean.res;

import com.vrimmer.bean.GameRuleInfo;
import com.vrimmer.bean.ResultCode;
import java.util.List;

public class GameInfoPage_res extends ResultCode{
	
	private int pageNum;
	List<GameRuleInfo> apprules;

	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public List<GameRuleInfo> getApprules() {
		return apprules;
	}

	public void setApprules(List<GameRuleInfo> apprules) {
		this.apprules = apprules;
	}

}
