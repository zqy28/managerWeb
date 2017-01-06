package com.vrimmer.util;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

/**
 * Created by zhanghs on 2015/3/24.
 */
public class DESUtil {
    /** 加密算法DES */
    public final static String ALGORITHM_DES = "DES";
    public final static String DEFAULT_CHARSET = "UTF-8";
    /**
     * 根据传入的字符串的key生成DES key对象
     *
     * @param key
     * @throws InvalidKeyException
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     */
    private static Key DESKey(byte[] key) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException {
        KeySpec keySpec = new DESKeySpec(key);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(ALGORITHM_DES);
        return keyFactory.generateSecret(keySpec);
    }
    /**
     * DES加密<br/>
     *
     * @param origin 明文
     * @param key 密钥
     * @return
     * @throws Exception
     */
    public static byte[] DESEncrypt(byte[] origin, byte[] key) throws Exception {
        Key keySpec = DESKey(key);
        return cipherEncrypt(origin, keySpec, ALGORITHM_DES);
    }
    /**
     * DES加密<br/>
     * 使用默认编码
     * @param origin 明文
     * @param key 密钥
     * @return
     * @throws Exception
     */
    public static byte[] DESEncrypt(String origin, String key) throws Exception {
        return DESEncrypt(origin.getBytes(DEFAULT_CHARSET), key.getBytes(DEFAULT_CHARSET));
    }
    /**
     * DES加密<br/>
     *
     * @param origin 明文
     * @param key 密钥
     * @param charset 编码
     * @return
     * @throws UnsupportedEncodingException
     * @throws Exception
     */
    public static byte[] DESEncrypt(String origin, String key, String charset) throws UnsupportedEncodingException, Exception {
        return DESEncrypt(origin.getBytes(charset), key.getBytes(charset));
    }
    /**
     * Java cipher 加密<br/>
     *
     * @param origin 明文
     * @param key 密钥
     * @param algorithm 算法
     * @return 密文
     * @throws Exception
     */
    public static byte[] cipherEncrypt(byte[] origin, Key key, String algorithm) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(origin);
    }
    /**
     * Java cipher解密<br/>
     *
     * @param origin 密文
     * @param key 密钥
     * @param algorithm 算法
     * @return 明文
     * @throws Exception
     */
    public static byte[] cipherDecrypt(byte[] origin, Key key, String algorithm) throws Exception {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(origin);
    }
    /**
     * DES解密<br/>
     *
     * @param origin 明文
     * @param key 密钥
     * @return
     * @throws Exception
     */
    public static byte[] DESDecrypt(byte[] origin, byte[] key) throws Exception {
        Key keySpec = DESKey(key);
        return cipherDecrypt(origin, keySpec, ALGORITHM_DES);
    }
    /**
     * DES解密<br/>
     * 使用默认编码
     * @param origin 明文
     * @param key 密钥
     * @return
     * @throws Exception
     */
    public static String DESDecrypt(String origin, String key) throws Exception {
        byte[] result = DESDecrypt(origin.getBytes(DEFAULT_CHARSET), key.getBytes(DEFAULT_CHARSET));
        return new String(result);
    }
    /**
     * DES解密<br/>
     *
     * @param origin 明文
     * @param key 密钥
     * @param charset
     * @return
     * @throws UnsupportedEncodingException
     * @throws Exception
     */
    public static String DESDecrypt(String origin, String key, String charset) throws UnsupportedEncodingException, Exception {
        byte[] result = DESDecrypt(origin.getBytes(DEFAULT_CHARSET), key.getBytes(charset));
        return new String(result);
    }
}
