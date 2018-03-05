package com.ddl.admin.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ddl.admin.bean.SysMenuBean;
import com.ddl.admin.bean.SysRoleMenuBean;
import com.ddl.bean.UserBean;


@Repository
@Transactional
public class SysRoleMenuDao {
	@PersistenceContext
	private EntityManager entityManager;
	
	  /**
	   * 保存
	   */
	  public void create(SysRoleMenuBean data) {
	    entityManager.persist(data);
	    return;
	  }

	  /**
	   * 
	   */
	  public void update(SysRoleMenuBean data) {
	    entityManager.merge(data);
	    return;
	  }
	  
	  /**
	   * Delete
	   */
	  public void delete(SysRoleMenuBean data) {
	    if (entityManager.contains(data))
	      entityManager.remove(data);
	    else
	      entityManager.remove(entityManager.merge(data));
	    return;
	  }

	  public SysRoleMenuBean getById(int nId) {
		  List list = entityManager.createQuery(
			        "from SysRoleMenuBean where id = :vid",SysMenuBean.class)
			        .setParameter("vid", nId)			       
			        .getResultList();
		  
		    if (list.size() == 0)
		    	return null;
		    
		    return (SysRoleMenuBean) list.get(0);
	  }
	  
	  public List<SysRoleMenuBean> list(String condition){
		  ///原来要用这种方式才能触发UserBean里面的Formula标签
		  String sql = "select cy.title as menu_title, bli.* from sys_role_menu bli left join sys_menus cy on cy.id=bli.menu_id where " + condition + " and bli.delflag=0";
		  List<SysRoleMenuBean> lists = entityManager.createNativeQuery(sql, SysRoleMenuBean.class).getResultList();
		  
		  return lists;
	  }
	  
	  public int delete(String condition) {
		  String sql = "delete from sys_role_menu where " + condition;
		  
		  return entityManager.createNativeQuery(sql).executeUpdate();
	  }
}
