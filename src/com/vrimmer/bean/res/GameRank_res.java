package com.vrimmer.bean.res;

import java.util.List;
import com.vrimmer.bean.GameRank;
import com.vrimmer.bean.ResultCode;

public class GameRank_res extends ResultCode {
	private List<GameRank> appRanks;

	public List<GameRank> getAppRanks() {
		return appRanks;
	}

	public void setAppRanks(List<GameRank> appRanks) {
		this.appRanks = appRanks;
	}
}
