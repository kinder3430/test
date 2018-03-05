package com.ddl.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ddl.bean.UserBean;


@Repository
@Transactional
public class UserDao {
	@PersistenceContext
	private EntityManager entityManager;
	
	  /**
	   * 保存
	   */
	  public void create(UserBean data) {
	    entityManager.persist(data);
	    return;
	  }

	  /**
	   * 
	   */
	  public void update(UserBean data) {
	    entityManager.merge(data);
	    return;
	  }
	  
	  /**
	   * Delete
	   */
	  public void delete(UserBean data) {
	    if (entityManager.contains(data))
	      entityManager.remove(data);
	    else
	      entityManager.remove(entityManager.merge(data));
	    return;
	  }

	  
	  public UserBean getByAccount(String account) {
		  List list = entityManager.createQuery(
			        "from UserBean where user_login = :account_value",UserBean.class)
			        .setParameter("account_value", account)			       
			        .getResultList();
		  
		    if (list.size() == 0)
		    	return null;
		    
		    return (UserBean) list.get(0);
	  }
	  
	  public UserBean getById(long nId) {
		  List list = entityManager.createQuery(
			        "from UserBean where id = :user_id",UserBean.class)
			        .setParameter("user_id", nId)			       
			        .getResultList();
		  
		    if (list.size() == 0)
		    	return null;
		    
		    return (UserBean) list.get(0);
	  }
	  
	  public List<UserBean> list(String condition){
		  ///原来要用这种方式才能触发UserBean里面的Formula标签
		  String sql = "select * from sp_user where " + condition + " and delflag=0";
		  List<UserBean> lists = entityManager.createNativeQuery(sql, UserBean.class).getResultList();
		  
		  return lists;
	  }
	  
	  public List<UserBean> listAdmin(String condition){
		  ///原来要用这种方式才能触发UserBean里面的Formula标签
		  String sql = "select cy.role_name,'' as password, bli.* from sp_user bli left join sys_role cy on cy.role_id=bli.role_id where bli.type=3 and " + condition + " and bli.delflag=0";
		  List<UserBean> lists = entityManager.createNativeQuery(sql, UserBean.class).getResultList();
		  
		  return lists;
	  }
}
