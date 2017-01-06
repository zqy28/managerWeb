package com.vrimmer.dao;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

import org.apache.struts2.ServletActionContext;

import com.vrimmer.util.MD5Util;
import com.vrimmer.util.restFunc;

public class AdminDao {
	public String getPrizes(String queryTime) throws MalformedURLException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL")+"findAllPrize");
		String sign = MD5Util.MD5Encode(queryTime+"ImmAimee", "utf-8");
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("queryTime", queryTime);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}

	public String updatePrize(String prizeId, String name, String detail, String text, String inventory) throws MalformedURLException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL")+"updatePrize");
		String sign = MD5Util.MD5Encode(name+"ImmAimee", "utf-8");
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("prizeId", prizeId);
		data.put("name", name);
		data.put("detail", detail);
		data.put("text", text);
		data.put("inventory", inventory);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}

	public String getRecords(String index, String pageSize, String queryTime) throws MalformedURLException {
		URL url = new URL(ServletActionContext.getServletContext().getInitParameter("prefixURL")+"findAllRecord");
		String sign = MD5Util.MD5Encode(queryTime+"ImmAimee", "utf-8");
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("index", index);
		data.put("pageSize", pageSize);
		data.put("queryTime", queryTime);
		data.put("sign", sign);
		String JSonData = restFunc.getJson(url, data);
		return JSonData;
	}


}
