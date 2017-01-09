package com.vrimmer.interceptor;

import java.util.Map;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

public class MyInterceptor extends MethodFilterInterceptor {

	/**
	 * 
	 */
	private static final long serialVersionUID = -412441747177304205L;

	@Override
	protected String doIntercept(ActionInvocation invocation) throws Exception {
		System.out.println("-----Enter Intercept-----");
		Map<String, Object> session = ActionContext.getContext().getSession();
		if(session.get("useId") != null){
			return invocation.invoke();
		}else{
			//System.out.println("uid = null");
			return "logon";
		}		
	}

}
