package com.vrimmer.action;

import java.io.Console;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ActionSupport;
import com.vrimmer.bean.AppRunLogs;
import com.vrimmer.bean.GameRuleInfo;
import com.vrimmer.bean.ResultCode;
import com.vrimmer.bean.res.AppRunLogs_res;
import com.vrimmer.bean.res.BonusPool_res;
import com.vrimmer.bean.res.GameInfoPage_res;
import com.vrimmer.bean.res.GameName_res;
import com.vrimmer.bean.res.GameRank_res;
import com.vrimmer.bean.res.GameRuleInfo_res;
import com.vrimmer.dao.MessageDao;

public class MessageAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	HttpSession session = getSession();
	HttpServletResponse response = getResponse();

	private int appid;
	private String usrName;
	private String usrPassword;
	private int index;
	private int pageSize;
	private int type;
	private String newGameRule;
	private String money;

	public String getNewGameRule() {
		return newGameRule;
	}

	public void setNewGameRule(String newGameRule) {
		this.newGameRule = newGameRule;
	}

	public String getUsrName() {
		return usrName;
	}

	public void setUsrName(String usrName) {
		this.usrName = usrName;
	}

	public String getUsrPassword() {
		return usrPassword;
	}

	public void setUsrPassword(String usrPassword) {
		this.usrPassword = usrPassword;
	}

	public int getAppid() {
		return appid;
	}

	public void setAppid(int appid) {
		this.appid = appid;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	private String tip;

	public String login() throws Exception {
		MessageDao uDao = new MessageDao();
		session.removeAttribute("useId");
		try {
			String JsonData = uDao.login(usrName, usrPassword);
			// System.out.println(JsonData);
			ResultCode log_res = JSON.parseObject(JsonData, ResultCode.class);
			if (log_res.getResultCode().equals("1")) {
				session.setAttribute("useId", usrName);
			}
			tip = JSON.toJSONString(log_res);

			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}

	public String logout() throws Exception {
		try {
			session.removeAttribute("useId");
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write("成功注销!");
		} catch (Exception e) {
			System.err.println(e);
		}
		return null;
	}

	public String getGame() throws Exception {
		MessageDao uDao = new MessageDao();
		int getNameresultCode = 1;
		try {
			String JsonData = uDao.getGameInfo(index, pageSize);
			GameInfoPage_res log_res = JSON.parseObject(JsonData, GameInfoPage_res.class);
			for (GameRuleInfo gameinfo : log_res.getApprules()) {
				String gameNameJsonData = uDao.getGameName((String) session.getAttribute("useId"), gameinfo.getAppId());
				GameName_res gameName_res = JSON.parseObject(gameNameJsonData, GameName_res.class);
				if (!gameName_res.getResultcode().equals("0000")) {
					getNameresultCode = 0;
					break;
				}
				gameinfo.setAppName(gameName_res.getGame().getName());
			}

			if (getNameresultCode != 1) {
				log_res.setResultCode("0");
				log_res.setResultMessage(log_res.getResultMessage() + "获取游戏名失败!!");
			}
			tip = JSON.toJSONString(log_res);

			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}

	public String getGameRule() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.getGameRuleInfo(appid);
			GameRuleInfo_res log_res = JSON.parseObject(JsonData, GameRuleInfo_res.class);

			tip = JSON.toJSONString(log_res);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}

	public String setGameRule() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			GameRuleInfo log_res = JSON.parseObject(newGameRule, GameRuleInfo.class);
			String JsonDataBaic = uDao.setGameBasicRule(log_res.getAppId(), log_res.getPrice(), log_res.getBasePoint(),
					log_res.getFinalPoint());
			ResultCode changeBasicResult = JSON.parseObject(JsonDataBaic, ResultCode.class);

			String JsonDataEx = uDao.setGameExRule(log_res.getRewardSystems());
			ResultCode changeExResult = JSON.parseObject(JsonDataEx, ResultCode.class);

			ResultCode changeResultSum = new ResultCode();
			if (changeBasicResult.getResultCode().equals("1") && changeExResult.getResultCode().equals("1")) {
				changeResultSum.setResultCode("1");
			} else {
				changeResultSum.setResultCode("0");
			}
			changeResultSum.setResultMessage("修改基础规则: " + changeBasicResult.getResultMessage() + " 修改进阶规则: "
					+ changeExResult.getResultMessage() );

			tip = JSON.toJSONString(changeResultSum);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}

	public String setNewGameRule() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			GameRuleInfo log_res = JSON.parseObject(newGameRule, GameRuleInfo.class);
			String JsonData = uDao.setNewGameRule(log_res);
			ResultCode newRuleResult = JSON.parseObject(JsonData, ResultCode.class);
		
			newRuleResult.setResultMessage("新增游戏规则: " + newRuleResult.getResultMessage() );
			tip = JSON.toJSONString(newRuleResult);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}

	public String deleteGameRule() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.deleteGameRule(appid);
			ResultCode resultCode = JSON.parseObject(JsonData, ResultCode.class);

			tip = JSON.toJSONString(resultCode);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}

	public String getGameRanking() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.getGameRanking(appid);
			GameRank_res gameName = JSON.parseObject(JsonData, GameRank_res.class);

			tip = JSON.toJSONString(gameName);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}
	
	public String getRewardLog() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.getRewardLog(index,pageSize,type);
			AppRunLogs_res rewardLog = JSON.parseObject(JsonData, AppRunLogs_res.class);
			for(AppRunLogs rewardlog:rewardLog.getAppRunLogs()){
			String gameNameJson = uDao.getGameName((String) session.getAttribute("useId"), rewardlog.getAppId());
			GameName_res gameName_res = JSON.parseObject(gameNameJson, GameName_res.class);
			rewardlog.setGameName(gameName_res.getGame().getName());
			}
			tip = JSON.toJSONString(rewardLog);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}
	
	public String injectPool() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.injectPool(money);
			ResultCode result_res = JSON.parseObject(JsonData, ResultCode.class);

			tip = JSON.toJSONString(result_res);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}
	public String findPool() throws Exception {
		//session.removeAttribute("useId");
	
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.findPool();
			BonusPool_res poolresult = JSON.parseObject(JsonData, BonusPool_res.class);

			tip = JSON.toJSONString(poolresult);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(tip);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}
	public String getExchangelog() throws Exception {
		MessageDao uDao = new MessageDao();

		try {
			String JsonData = uDao.getExchangelog(index,pageSize);
			response.setContentType("text/plain;charset=UTF-8");
			response.getWriter().write(JsonData);

		} catch (Exception e) {
			System.err.println(e);
		}

		return null;
	}
//	public String findAllPool() throws Exception {
//		MessageDao uDao = new MessageDao();
//		int getNameresultCode = 1;
//		try {
//			BonusPool_res poolresult=new BonusPool_res();
//			String JsonData = uDao.getGameInfo(index, pageSize);
//			GameInfoPage_res log_res = JSON.parseObject(JsonData, GameInfoPage_res.class);
//			for (GameRuleInfo gameinfo : log_res.getApprules()) {
//				String gameNameJsonData = uDao.getGameName((String) session.getAttribute("useId"), gameinfo.getAppId());
//				GameName_res gameName_res = JSON.parseObject(gameNameJsonData, GameName_res.class);
//				
//				String poolJsonData = uDao.findPool(gameinfo.getAppId());
//				System.out.println("ttt  "+poolJsonData);
//				poolresult = JSON.parseObject(poolJsonData, BonusPool_res.class);
//				
//				if (!(gameName_res.getResultcode().equals("0000")&&poolresult.getResultCode().equals("1"))) {
//					getNameresultCode = 0;
//					break;
//				}
//				gameinfo.setAppName(gameName_res.getGame().getName());
//				gameinfo.setBonusPool(poolresult.getBonusPools());
//				System.out.println(JSON.toJSONString(gameinfo.getBonusPool()));
//			}
//
//			if (getNameresultCode != 1) {
//				log_res.setResultCode("0");
//				log_res.setResultMessage(log_res.getResultMessage() + " 获取游戏名失败! 获取奖金池:"+ poolresult.getResultMessage());
//			}
//			tip = JSON.toJSONString(log_res);
//
//			response.setContentType("text/plain;charset=UTF-8");
//			response.getWriter().write(tip);
//
//		} catch (Exception e) {
//			System.err.println(e);
//		}
//
//		return null;
//
//	}

	private HttpSession getSession() {
		HttpSession session = ServletActionContext.getRequest().getSession();
		return session;
	}

	public HttpServletResponse getResponse() {
		HttpServletResponse response = ServletActionContext.getResponse();
		return response;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

}
