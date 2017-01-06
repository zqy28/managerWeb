package com.vrimmer.action;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.vrimmer.dao.AdminDao;
import com.opensymphony.xwork2.ActionSupport;

public class AdminAction extends ActionSupport{
	private String queryTime;
	private String prizeId;
	private String name;
	private String detail;
	private String text;
	private String inventory;
	private String index;
	private String pageSize;
	HttpSession session = getSession();
	HttpServletRequest request = getRequest();
	HttpServletResponse response = getResponse();
	
	public String getPrizes() throws MalformedURLException {
		AdminDao adminDao = new AdminDao();
		String JsonData = adminDao.getPrizes(queryTime);
		
		response.setContentType("text/plain;charset=UTF-8");
	 	try{
			response.getWriter().write(JsonData);
		}catch(IOException e){
			e.printStackTrace();
		}
		return null;
	}
	
	public String updatePrize() throws MalformedURLException {
		AdminDao adminDao = new AdminDao();
		String JsonData = adminDao.updatePrize(prizeId,name,detail,text,inventory);
		
		response.setContentType("text/plain;charset=UTF-8");
	 	try{
			response.getWriter().write(JsonData);
		}catch(IOException e){
			e.printStackTrace();
		}
		return null;
	}
	
	public String getRecords() throws MalformedURLException {
		AdminDao adminDao = new AdminDao();
		String JsonData = adminDao.getRecords(index,pageSize,queryTime);
		
		response.setContentType("text/plain;charset=UTF-8");
	 	try{
			response.getWriter().write(JsonData);
		}catch(IOException e){
			e.printStackTrace();
		}
		return null;
	}
	
	public String getQueryTime() {
		return queryTime;
	}

	public void setQueryTime(String queryTime) {
		this.queryTime = queryTime;
	}
	
	private HttpSession getSession(){
		HttpSession session = ServletActionContext.getRequest().getSession();
		return session;
	}
	
	public HttpServletRequest getRequest(){
		HttpServletRequest request = ServletActionContext.getRequest();
		return request;
	}
	
	public HttpServletResponse getResponse(){
		HttpServletResponse response = ServletActionContext.getResponse();
		return response;
	}

	public String getPrizeId() {
		return prizeId;
	}

	public void setPrizeId(String prizeId) {
		this.prizeId = prizeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getInventory() {
		return inventory;
	}

	public void setInventory(String inventory) {
		this.inventory = inventory;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getPageSize() {
		return pageSize;
	}

	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}
}
