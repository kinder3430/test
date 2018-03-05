package com.ddl.admin.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ddl.admin.bean.SysMenuBean;
import com.ddl.bean.UserBean;


@Repository
@Transactional
public class SysMenuDao {
	@PersistenceContext
	private EntityManager entityManager;
	
	  /**
	   * 保存
	   */
	  public void create(SysMenuBean data) {
	    entityManager.persist(data);
	    return;
	  }

	  /**
	   * 
	   */
	  public void update(SysMenuBean data) {
	    entityManager.merge(data);
	    return;
	  }
	  
	  /**
	   * Delete
	   */
	  public void delete(SysMenuBean data) {
	    if (entityManager.contains(data))
	      entityManager.remove(data);
	    else
	      entityManager.remove(entityManager.merge(data));
	    return;
	  }

	  public SysMenuBean getById(int nId) {
		  List list = entityManager.createQuery(
			        "from SysMenuBean where id = :vid",SysMenuBean.class)
			        .setParameter("vid", nId)			       
			        .getResultList();
		  
		    if (list.size() == 0)
		    	return null;
		    
		    return (SysMenuBean) list.get(0);
	  }
	  
	  public List<SysMenuBean> list(String condition){
		  ///原来要用这种方式才能触发UserBean里面的Formula标签
		  String sql = "select cy.title as ptitle, bli.* from sys_menus bli left join sys_menus cy on cy.id=bli.pid where " + condition + " and bli.delflag=0";
		  List<SysMenuBean> lists = entityManager.createNativeQuery(sql, SysMenuBean.class).getResultList();
		  
		  return lists;
	  }
	  
}
