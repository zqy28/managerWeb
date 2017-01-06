package com.vrimmer.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;


/**
 * created by jqli on 2016/7/22
 */
public class PasswordUtil {
		
	public static String SHA384encode(String data){
        return DigestUtils.sha384Hex(data);
    }
    public static String SHA384encode(byte[] data){
        return DigestUtils.sha384Hex(data);
    }

    public static byte[] decryptBase64DES(String encryptData,String key){
        byte[] data=Base64.decodeBase64(encryptData);
        try {
            return DESUtil.DESDecrypt(data,key.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new byte[0];
    }
    public static byte[] decryptBase64DES(byte[] encryptData,String key){
        byte[] data=Base64.decodeBase64(encryptData);
        try {
            return DESUtil.DESDecrypt(data,key.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new byte[0];
    }
    public static byte[] encryptBase64DES(String data,String key){
        try {
            byte[] desData=DESUtil.DESEncrypt(data.getBytes(),key.getBytes());
            return Base64.encodeBase64URLSafe(desData);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new byte[0];
    }
    
    /**
     * 对原来密码进行解码，对解码后的原始密码进行sha384摘要
     * @param password
     * @param key
     * @return
     */
    public static String rebuiltPassword(String password, String key){
    	byte[] data = PasswordUtil.decryptBase64DES(password, key);
		if(data.length==0){
			return null;
		}
		return PasswordUtil.SHA384encode(data);
    }

}
