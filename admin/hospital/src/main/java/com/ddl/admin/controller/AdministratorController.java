package com.ddl.admin.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.expression.Lists;
import org.thymeleaf.util.StringUtils;

import com.ddl.admin.bean.RoleBean;
import com.ddl.admin.bean.SysMenuBean;
import com.ddl.admin.bean.SysRoleMenuBean;
import com.ddl.admin.dao.RoleDao;
import com.ddl.admin.dao.SysMenuDao;
import com.ddl.admin.dao.SysRoleMenuDao;
import com.ddl.admin.model.SysTree;
import com.ddl.admin.model.SysTreeResult;
import com.ddl.bean.UserBean;
import com.ddl.dao.UserDao;
import com.ddl.model.AdminResult;

@Controller
public class AdministratorController {
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	SysMenuDao sysMenuDao;
	
	@Autowired
	RoleDao roleDao;
	
	@Autowired
	SysRoleMenuDao sysRoleMenuDao;
	
	@RequestMapping(value="/admin/login")
	@ResponseBody
	public AdminResult login(Model model, HttpServletRequest request, HttpSession session) {
		String user_login_name = request.getParameter("user_login_name");
		String user_login_pwd = request.getParameter("user_login_pwd");
		
		UserBean user = userDao.getByAccount(user_login_name);
		
		if (user == null)
			return new AdminResult<String, String>(40400, "帐号不存在或者密码不正确", null);
		
		return new AdminResult<UserBean, String>(1, user, null);
	}
	
	@RequestMapping(value="/admin/logout")
	@ResponseBody
	public AdminResult logout(Model model, HttpServletRequest request, HttpSession session) {

		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/get_admin_users")
	@ResponseBody
	public AdminResult get_admin_users(Model model, HttpServletRequest request, HttpSession session) {
		String condition = "1";
		if (request.getParameter("user_nicename") != null)
			condition += " and bli.user_nicename like '%" + request.getParameter("user_nicename") + "%'";
		if (request.getParameter("user_login") != null)
			condition += " and bli.user_login like '%" + request.getParameter("user_login") + "%'";

		List<UserBean> users = userDao.listAdmin(condition);
		
		return new AdminResult<String, List<UserBean>>(1, null, users);
	}
	
	@RequestMapping(value="/admin/del_admin_user")
	@ResponseBody
	public AdminResult del_admin_user(Model model, HttpServletRequest request, HttpSession session) {
		int id = Integer.parseInt(request.getParameter("id"));
		
		UserBean role = userDao.getById(id);
		role.setDelflag(true);
		userDao.update(role);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/add_or_save_admin_user")
	@ResponseBody
	public AdminResult add_or_save_admin_user(Model model, HttpServletRequest request, HttpSession session) {
		String user_nicename = request.getParameter("user_nicename");
		String user_login = request.getParameter("user_login");
		String password = request.getParameter("password");
		int role_id = Integer.parseInt(request.getParameter("role_id"));
		int id = 0;
		if (!request.getParameter("id").isEmpty())
			id = Integer.parseInt(request.getParameter("id"));
		
		UserBean role = null;
		if (id == 0)
		{
			role = new UserBean();
			role.setType(3);
			role.setAvatar("");
			role.setCreate_date(new Date());
		}
		else
		{
			role = userDao.getById(id);
		}
		role.setRole_id(role_id);
		role.setUser_login(user_login);
		role.setUser_nicename(user_nicename);
		role.setStatus(1);
		
		if (!password.isEmpty())
			role.setPassword(password);
		
		if (id == 0)
			userDao.create(role);
		else
			userDao.update(role);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/update_admin_password")
	@ResponseBody
	public AdminResult update_admin_password(Model model, HttpServletRequest request, HttpSession session) {
		String new_login_pwd = request.getParameter("new_login_pwd");
		String old_login_pwd = request.getParameter("old_login_pwd");

		UserBean user = userDao.getById(Long.parseLong(request.getParameter("oper_user_id")));
		
		user.setPassword(new_login_pwd);
		
		userDao.update(user);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/get_user_menus")
	@ResponseBody
	public AdminResult get_user_menus(Model model, HttpServletRequest request, HttpSession session) {
		
		UserBean user = userDao.getById(Long.parseLong(request.getParameter("oper_user_id")));
		
		List<SysRoleMenuBean> role_menus = sysRoleMenuDao.list("bli.role_id=" + user.getRole_id());
		
		String menu_ids = "";
		for (SysRoleMenuBean role_menu : role_menus)
		{
			if (menu_ids.isEmpty())
				menu_ids = Integer.toString(role_menu.getMenu_id());
			else
				menu_ids += "," + role_menu.getMenu_id();
		}
		
		List<SysMenuBean> top_menus = sysMenuDao.list("bli.pid=0");
		List<SysMenuBean> user_menus = new ArrayList<SysMenuBean>();
		
		for (SysMenuBean menu : top_menus)
		{
			menu.setChilds(sysMenuDao.list("bli.pid=" + menu.getId() + " and bli.id in (" + menu_ids + ")"));
		
			if (menu.getChilds().size() > 0)
				user_menus.add(menu);
		}
		
		return new AdminResult<String, List<SysMenuBean>>(1, null, user_menus);
	}
	
	@RequestMapping(value="/admin/get_menus")
	@ResponseBody
	public AdminResult get_menus(Model model, HttpServletRequest request, HttpSession session) {
		String condition = "bli.pid<>0";
		if (request.getParameter("title") != null)
			condition += " and bli.title like '%" + request.getParameter("title") + "%'";
		if (request.getParameter("ptitle") != null)
			condition += " and cy.title like '%" + request.getParameter("ptitle") + "%'";
		
		List<SysMenuBean> top_menus = sysMenuDao.list(condition);
		
		return new AdminResult<String, List<SysMenuBean>>(1, null, top_menus);
	}
	
	@RequestMapping(value="/admin/get_top_menus")
	@ResponseBody
	public AdminResult get_top_menus(Model model, HttpServletRequest request, HttpSession session) {
		List<SysMenuBean> top_menus = sysMenuDao.list("bli.pid=0");
		
		return new AdminResult<String, List<SysMenuBean>>(1, null, top_menus);
	}
	
	@RequestMapping(value="/admin/add_or_save_top_menu")
	@ResponseBody
	public AdminResult add_or_save_top_menu(Model model, HttpServletRequest request, HttpSession session) {
		String title = request.getParameter("title");
		int id = 0;
		if (!request.getParameter("id").isEmpty())
			id = Integer.parseInt(request.getParameter("id"));
		
		SysMenuBean menu = null;
		if (id == 0)
		{
			menu = new SysMenuBean();
			menu.setIs_leaf(0);
			menu.setIs_sys(1);
			menu.setSort_id(1);
			menu.setCreate_date(new Date());
		}
		else
		{
			menu = sysMenuDao.getById(id);
		}
		menu.setTitle(title);
		
		if (id == 0)
			sysMenuDao.create(menu);
		else
			sysMenuDao.update(menu);
		
		return new AdminResult<String, String>(1, null, null);
	}
	

	@RequestMapping(value="/admin/add_or_save_menu")
	@ResponseBody
	public AdminResult add_or_save_menu(Model model, HttpServletRequest request, HttpSession session) {
		String title = request.getParameter("title");
		String link_url = request.getParameter("link_url");
		int pid = Integer.parseInt(request.getParameter("pid"));
		int id = 0;
		if (!request.getParameter("id").isEmpty())
			id = Integer.parseInt(request.getParameter("id"));
		
		SysMenuBean menu = null;
		if (id == 0)
		{
			menu = new SysMenuBean();
			menu.setIs_leaf(1);
			menu.setIs_sys(1);
			menu.setSort_id(1);
			menu.setCreate_date(new Date());
		}
		else
		{
			menu = sysMenuDao.getById(id);
		}
		menu.setStatus(Integer.parseInt(request.getParameter("status")));
		menu.setPid(pid);
		menu.setTitle(title);
		menu.setLink_url(link_url);
		
		if (id == 0)
			sysMenuDao.create(menu);
		else
			sysMenuDao.update(menu);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/del_top_menu")
	@ResponseBody
	public AdminResult del_top_menu(Model model, HttpServletRequest request, HttpSession session) {
		int id = Integer.parseInt(request.getParameter("id"));
		
		SysMenuBean menu = sysMenuDao.getById(id);
		menu.setDelflag(true);
		sysMenuDao.update(menu);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/del_menu")
	@ResponseBody
	public AdminResult del_menu(Model model, HttpServletRequest request, HttpSession session) {
		int id = Integer.parseInt(request.getParameter("id"));
		
		SysMenuBean menu = sysMenuDao.getById(id);
		menu.setDelflag(true);
		sysMenuDao.update(menu);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/get_roles")
	@ResponseBody
	public AdminResult get_roles(Model model, HttpServletRequest request, HttpSession session) {
		String condition = "1";

		List<RoleBean> roles = roleDao.list(condition);
		
		return new AdminResult<String, List<RoleBean>>(1, null, roles);
	}
	
	@RequestMapping(value="/admin/add_or_save_role")
	@ResponseBody
	public AdminResult add_or_save_role(Model model, HttpServletRequest request, HttpSession session) {
		String role_name = request.getParameter("role_name");
		String role_desc = request.getParameter("role_desc");
		int id = 0;
		if (!request.getParameter("role_id").isEmpty())
			id = Integer.parseInt(request.getParameter("role_id"));
		
		RoleBean role = null;
		if (id == 0)
		{
			role = new RoleBean();
			role.setStatus(1);
			role.setCreate_date(new Date());
		}
		else
		{
			role = roleDao.getById(id);
		}
		role.setRole_desc(role_desc);
		role.setRole_name(role_name);
		
		if (id == 0)
			roleDao.create(role);
		else
			roleDao.update(role);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/del_role")
	@ResponseBody
	public AdminResult del_role(Model model, HttpServletRequest request, HttpSession session) {
		int id = Integer.parseInt(request.getParameter("id"));
		
		RoleBean role = roleDao.getById(id);
		role.setDelflag(true);
		roleDao.update(role);
		
		return new AdminResult<String, String>(1, null, null);
	}
	
	@RequestMapping(value="/admin/get_role_menu_tree")
	@ResponseBody
	public SysTreeResult get_role_menu_tree(Model model, HttpServletRequest request, HttpSession session) {
		int role_id = Integer.parseInt(request.getParameter("role_id"));
		
		List<SysRoleMenuBean> role_menus = sysRoleMenuDao.list("bli.role_id=" + role_id);
		
		List<SysMenuBean> sys_menus = sysMenuDao.list("1");
		
		SysTreeResult result = new SysTreeResult();
		result.setRet(true);
		SysTree root_node = new SysTree();
		root_node.setChecked(true);
		root_node.setExpanded(true);
		root_node.setLeaf(false);
		root_node.setId("");
		root_node.setText("父");
		root_node.setChildren(new ArrayList<SysTree>());
		result.setTreestore(root_node);
		
		Map<Integer, SysTree> tree_map = new Hashtable<Integer, SysTree>();
		
		for (SysMenuBean menu : sys_menus)
		{
			if (menu.getPid() != 0)
				continue;
			
			// 先放入父节点
			SysTree tree_parent_node = new SysTree();
			tree_parent_node.setChecked(false);
			tree_parent_node.setId("MENU_MODEL#" + menu.getId());
			tree_parent_node.setLeaf(false);
			tree_parent_node.setText(menu.getTitle());
			tree_parent_node.setExpanded(true);
			tree_parent_node.setChildren(new ArrayList<SysTree>());
			result.getTreestore().getChildren().add(tree_parent_node);
			
			tree_map.put(menu.getId(), tree_parent_node);
		}
		
		for (SysMenuBean menu : sys_menus)
		{
			if (menu.getPid() == 0)
				continue;
			
			// 先放入父节点
			SysTree tree_node = new SysTree();
			tree_node.setChecked(false);
			tree_node.setId("MENU_MODEL#" + menu.getId());
			tree_node.setLeaf(false);
			tree_node.setText(menu.getTitle());
			tree_node.setExpanded(true);
			tree_node.setChildren(new ArrayList<SysTree>());
			SysTree tree_parent_node = tree_map.get(menu.getPid());

			tree_parent_node.getChildren().add(tree_node);
			
			tree_map.put(menu.getId(), tree_node);
		}
		
		for (SysRoleMenuBean sys_role_menu : role_menus)
		{
			SysTree tree_parent_node = tree_map.get(sys_role_menu.getMenu_id());
			if (tree_parent_node != null)
				tree_parent_node.setChecked(true);
		}
		
		return result;
	}
	
	@RequestMapping(value="/admin/batch_set_role_menu")
	@ResponseBody
	public AdminResult batch_set_role_menuk(Model model, HttpServletRequest request, HttpSession session) {
		int role_id = Integer.parseInt(request.getParameter("role_id"));
		String menu_ids = request.getParameter("menu_ids");
	
		sysRoleMenuDao.delete("role_id=" + role_id + " and menu_id not in (" + menu_ids + ")");
		
		List<SysRoleMenuBean> role_menus = sysRoleMenuDao.list("bli.role_id=" + role_id);
		
		String[] ids_arr = menu_ids.split(",");
		
		for (String id : ids_arr)
		{
			boolean founded = false;
			for (SysRoleMenuBean role_menu : role_menus)
			{
				if (role_menu.getMenu_id() == Integer.parseInt(id))
				{
					founded = true;
					break;
				}
			}
			
			if (!founded)
			{
				SysRoleMenuBean new_menu = new SysRoleMenuBean();
				new_menu.setCreate_date(new Date());
				new_menu.setDelflag(false);
				new_menu.setStatus(1);
				new_menu.setMenu_id(Integer.parseInt(id));
				new_menu.setRole_id(role_id);
				sysRoleMenuDao.create(new_menu);
			}
		}
		
		return new AdminResult<String, String>(1, null, null);
	}
}
