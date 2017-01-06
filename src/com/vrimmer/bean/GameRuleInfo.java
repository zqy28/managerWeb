package com.vrimmer.bean;

import java.util.List;

public class GameRuleInfo {
	private String appName;
	private String appId;
	private String price;
	private String basePoint;
	private String finalPoint;
	private String rewardpool;
	List<GameRuleEx> rewardSystems;
	List<BonusPool> bonusPool;
	public List<BonusPool> getBonusPool() {
		return bonusPool;
	}
	public void setBonusPool(List<BonusPool> bonusPool) {
		this.bonusPool = bonusPool;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getBasePoint() {
		return basePoint;
	}
	public void setBasePoint(String basePoint) {
		this.basePoint = basePoint;
	}
	public String getFinalPoint() {
		return finalPoint;
	}
	public void setFinalPoint(String finalPoint) {
		this.finalPoint = finalPoint;
	}
	public String getRewardpool() {
		return rewardpool;
	}
	public void setRewardpool(String rewardpool) {
		this.rewardpool = rewardpool;
	}
	public List<GameRuleEx> getRewardSystems() {
		return rewardSystems;
	}
	public void setRewardSystems(List<GameRuleEx> rewardSystems) {
		this.rewardSystems = rewardSystems;
	}
}
