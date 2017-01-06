package com.vrimmer.dao;

import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.alibaba.fastjson.JSON;
import com.vrimmer.bean.GameRuleEx;
import com.vrimmer.bean.GameRuleInfo;
import com.vrimmer.util.MD5Util;
import com.vrimmer.util.restFunc;
import com.vrimmer.util.PasswordUtil;

public class MessageDao {

	HttpSession session = ServletActionContext.getRequest().getSession();

	public String login(String usrName, String usrPassword) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "managerLogin");
		HashMap<String, Object> data = new HashMap<String, Object>();
		byte[] passwordencry = PasswordUtil.encryptBase64DES(usrPassword, "12345678");
		String passwords = new String(passwordencry);
		String sign = MD5Util.MD5Encode(usrName + "ImmAimee", "utf-8");
		data.put("phone", usrName);
		data.put("passWord", passwords);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}

	public String getGameInfo(int index, int pageSize) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "findAllRule");
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String queryTime = dateFormat.format(now);
		String sign = MD5Util.MD5Encode(queryTime + "ImmAimee", "utf-8");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("index", index);
		data.put("pageSize", pageSize);
		data.put("queryTime", queryTime);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
//		URL url2 = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURLex") + "list");
//		HashMap<String, Object> data2 = new HashMap<String, Object>();
//		String sign2 = MD5Util.MD5Encode("55"+"1"+"ImmAimee", "utf-8");
//		data2.put("uid", 55);
//		data2.put("status", 1);
//		data2.put("index", 1);
//		data2.put("number", 20);
//		data2.put("order", 0);
//		data2.put("type", 7);
//		data2.put("sign", sign2);
//		String JSonData2 = restFunc.getJson(url2, data2);
		//System.out.println(JSonData2);
		//System.out.println(JSonData);
		return JSonData;
	}
	
	public String getGameName(String uid,String appId) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURLex") +"gameInfo");
		HashMap<String, Object> data = new HashMap<String, Object>();
		String sign = MD5Util.MD5Encode(uid+appId+"ImmAimee", "utf-8");
		data.put("uid", uid);
		data.put("appid", appId);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		
		return JSonData;
	}

	public String getGameRuleInfo(int appId) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "findRuleByAppId");
		String sign = MD5Util.MD5Encode(appId + "ImmAimee", "utf-8");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", appId);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}

	public String setGameBasicRule(String appId, String price, String basePoint, String finalPoint) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "changeBaseRule");
		String sign = MD5Util.MD5Encode(appId + "ImmAimee", "utf-8");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", appId);
		data.put("price", price);
		data.put("basePoint", basePoint);
		data.put("finalPoint", finalPoint);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}

	public String setGameExRule(List<GameRuleEx> rewardSystems) throws IOException {
		URL url = new URL(
				ServletActionContext.getServletContext().getInitParameter("prefixURL") + "changeAdvancedRule");

		HashMap<String, Object> data = new HashMap<String, Object>();
		String JSonData = "";
		for (GameRuleEx gamerule : rewardSystems) {
			String sign = MD5Util.MD5Encode(gamerule.getRewardSystemId() + "ImmAimee", "utf-8");
			data.put("rewardSystemId", gamerule.getRewardSystemId());
			data.put("upPercentage", gamerule.getUpPercentage());
			data.put("reward", gamerule.getReward());
			data.put("sign", sign);
			JSonData = restFunc.getJson(url, data);
		}
		return JSonData;
	}
	public String findPool(String appId) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "findPoolByAppId");
		String sign = MD5Util.MD5Encode(appId + "ImmAimee", "utf-8");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", appId);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}
	public String injectPool(int appId,String money) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "injectPool");
		String sign = MD5Util.MD5Encode(appId + "ImmAimee", "utf-8");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", appId);
		data.put("money", money);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}

	public String setNewGameRule(GameRuleInfo log_res) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "addRule");
		String sign = MD5Util.MD5Encode(log_res.getAppId() + "ImmAimee", "utf-8");

		List<GameRuleEx> rewardSystems = new ArrayList<GameRuleEx>();
		for (int i = 0; i < log_res.getRewardSystems().size(); i++) {
			GameRuleEx rewardSystem = new GameRuleEx();
			rewardSystem.setReward(log_res.getRewardSystems().get(i).getReward());
			rewardSystem.setUpPercentage(log_res.getRewardSystems().get(i).getUpPercentage());
			rewardSystems.add(i, rewardSystem);
		}
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", log_res.getAppId());
		data.put("price", log_res.getPrice());
		data.put("basePoint", log_res.getBasePoint());
		data.put("finalPoint", log_res.getFinalPoint());
		data.put("rewardSystems", rewardSystems);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}
	
	public String deleteGameRule(int appId) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "deleteRule");
		String sign = MD5Util.MD5Encode(appId + "ImmAimee", "utf-8");

		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", appId);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}
	
	public String getGameRanking(int appId) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "getAppRank");
		String sign = MD5Util.MD5Encode(appId + "ImmAimee", "utf-8");

		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("appId", appId);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}
	
	public String getRewardLog(int index,int pageSize,int type) throws IOException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL") + "getApprunlog");
		String sign = MD5Util.MD5Encode(type + "ImmAimee", "utf-8");

		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("index", index);
		data.put("pageSize", pageSize);
		data.put("type", type);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}
}
