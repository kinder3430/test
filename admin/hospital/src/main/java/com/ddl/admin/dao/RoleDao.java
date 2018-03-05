package com.ddl.admin.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ddl.admin.bean.RoleBean;
import com.ddl.admin.bean.SysMenuBean;
import com.ddl.bean.UserBean;


@Repository
@Transactional
public class RoleDao {
	@PersistenceContext
	private EntityManager entityManager;
	
	  /**
	   * 保存
	   */
	  public void create(RoleBean data) {
	    entityManager.persist(data);
	    return;
	  }

	  /**
	   * 
	   */
	  public void update(RoleBean data) {
	    entityManager.merge(data);
	    return;
	  }
	  
	  /**
	   * Delete
	   */
	  public void delete(RoleBean data) {
	    if (entityManager.contains(data))
	      entityManager.remove(data);
	    else
	      entityManager.remove(entityManager.merge(data));
	    return;
	  }

	  public RoleBean getById(int nId) {
		  List list = entityManager.createQuery(
			        "from RoleBean where role_id = :vid",RoleBean.class)
			        .setParameter("vid", nId)			       
			        .getResultList();
		  
		    if (list.size() == 0)
		    	return null;
		    
		    return (RoleBean) list.get(0);
	  }
	  
	  public List<RoleBean> list(String condition){
		  ///原来要用这种方式才能触发UserBean里面的Formula标签
		  String sql = "select bli.* from sys_role bli where " + condition + " and bli.delflag=0";
		  List<RoleBean> lists = entityManager.createNativeQuery(sql, RoleBean.class).getResultList();
		  
		  return lists;
	  }
	  
}
