package com.vrimmer.util;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;

import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import org.apache.commons.io.IOUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

public class restFunc {
	public static String getJson(URL url, Object data) {
		String theString = "";
		try {
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setDoOutput(true);
			connection.setDoInput(true);
			connection.setRequestMethod("POST");
			connection.setUseCaches(false);
			connection.setInstanceFollowRedirects(true);
			connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
			connection.connect();
			System.out.println("\n connected==>" + url.toString());

			DataOutputStream out = new DataOutputStream(connection.getOutputStream());

			ObjectMapper objectMapper = new ObjectMapper();

			System.out.println("请求报文为" + data);
			objectMapper.writeValue(out, data);
			out.flush();
			out.close();

			InputStream inputStream = connection.getInputStream();
			StringWriter writer = new StringWriter();
			IOUtils.copy(inputStream, writer, "utf-8");
			theString = writer.toString();
			System.out.println("返回报文为" + theString);
			writer.close();
			inputStream.close();
			connection.disconnect();

		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return theString;

	}

	public static String getJson1(URL url, Object data) throws IOException {
		String theString = "";

		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setRequestMethod("POST");
		connection.setUseCaches(false);
		connection.setInstanceFollowRedirects(true);
		connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
		connection.connect();
		System.out.println("\n connected==>" + url.toString());

		DataOutputStream out = new DataOutputStream(connection.getOutputStream());

		ObjectMapper objectMapper = new ObjectMapper();

		System.out.println("请求报文为" + data);
		objectMapper.writeValue(out, data);
		out.flush();
		out.close();

		InputStream inputStream = connection.getInputStream();
		StringWriter writer = new StringWriter();
		IOUtils.copy(inputStream, writer, "utf-8");
		theString = writer.toString();
		System.out.println("返回报文为" + theString);
		writer.close();
		inputStream.close();
		connection.disconnect();

		return theString;

	}

}


