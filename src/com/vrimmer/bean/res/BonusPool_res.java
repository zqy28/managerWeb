package com.vrimmer.bean.res;

import java.util.List;

import com.vrimmer.bean.BonusPool;
import com.vrimmer.bean.ResultCode;

public class BonusPool_res extends ResultCode{
	private List<BonusPool> bonusPools;

	public List<BonusPool> getBonusPools() {
		return bonusPools;
	}

	public void setBonusPools(List<BonusPool> bonusPools) {
		this.bonusPools = bonusPools;
	}

	
	
}
