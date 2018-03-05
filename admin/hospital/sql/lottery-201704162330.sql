/*
Navicat MySQL Data Transfer

Source Server         : www.vwoof.comm
Source Server Version : 50537
Source Host           : www.vwoof.com:3306
Source Database       : lottery

Target Server Type    : MYSQL
Target Server Version : 50537
File Encoding         : 65001

Date: 2017-04-16 23:30:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sp_user
-- ----------------------------
DROP TABLE IF EXISTS `sp_user`;
CREATE TABLE `sp_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL,
  `delflag` bit(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `user_login` varchar(255) NOT NULL,
  `user_nicename` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sp_user
-- ----------------------------
INSERT INTO `sp_user` VALUES ('1', ' ', '2017-04-16 16:58:13', '\0', 'e10adc3949ba59abbe56e057f20f883e', '3', 'admin', '超级管理员', '1', null, '1');

-- ----------------------------
-- Table structure for sys_menus
-- ----------------------------
DROP TABLE IF EXISTS `sys_menus`;
CREATE TABLE `sys_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` int(11) DEFAULT NULL COMMENT '类型：1：一级菜单    2 二级菜单',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `link_url` varchar(255) DEFAULT NULL COMMENT '链接地址',
  `pid` int(11) DEFAULT '0' COMMENT '父ID',
  `deep` int(11) DEFAULT '0' COMMENT '深度：0开头',
  `pid_list` varchar(255) DEFAULT NULL COMMENT '父ID集',
  `is_leaf` int(11) DEFAULT '0' COMMENT '是否叶子节点：0否     1 是',
  `is_sys` int(11) DEFAULT '0' COMMENT '是否系统菜单：0 否   1 是',
  `sort_id` int(11) DEFAULT '0' COMMENT '排序',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  `delflag` int(11) DEFAULT '0' COMMENT '删除标记',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `ptitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='后台系统菜单维护';

-- ----------------------------
-- Records of sys_menus
-- ----------------------------
INSERT INTO `sys_menus` VALUES ('1', '1', '后台菜单管理', null, '0', '0', null, '0', '1', '1', '1', '0', '2016-03-01 10:59:56', null);
INSERT INTO `sys_menus` VALUES ('2', '1', '系统管理', null, '0', '0', null, '0', '1', '1', '1', '0', '2016-03-01 10:59:56', null);
INSERT INTO `sys_menus` VALUES ('3', '2', '菜单项管理', 'menusList', '1', '1', ',1,', '1', '1', '1', '1', '0', '2017-04-16 17:44:02', null);
INSERT INTO `sys_menus` VALUES ('4', '2', '菜单模块管理', 'menuModelsList', '1', '1', ',1,', '1', '1', '1', '1', '0', '2016-03-01 10:59:56', null);
INSERT INTO `sys_menus` VALUES ('5', '2', '系统用户管理', 'adminUserList', '2', '1', ',2,', '1', '1', '1', '1', '0', '2016-03-01 10:59:56', null);
INSERT INTO `sys_menus` VALUES ('6', '2', '角色管理', 'roleList', '2', '1', ',2,', '1', '1', '1', '1', '0', '2016-03-01 10:59:56', null);
INSERT INTO `sys_menus` VALUES ('7', '1', '用户管理', null, '0', '0', null, '0', '1', '1', '1', '0', '2016-05-12 17:35:08', null);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `role_desc` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  `delflag` int(11) DEFAULT '0' COMMENT '删除标记',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='系统角色表（系统角色定义），定义系统有什么角色';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', '超级管理员', '所有菜单', '1', '0', '2015-05-24 14:37:47');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `role_menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `menu_id` int(11) DEFAULT NULL COMMENT '菜单ID',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  `delflag` int(11) DEFAULT '0' COMMENT '删除标记',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `menu_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='系统角色菜单表（这个角色有什么菜单，对应菜单可以进行什么操作）';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('1', '1', '3', '1', '0', '2017-04-16 22:14:47', null);
INSERT INTO `sys_role_menu` VALUES ('2', '1', '4', '1', '0', '2017-04-16 22:14:48', null);
INSERT INTO `sys_role_menu` VALUES ('3', '1', '5', '1', '0', '2017-04-16 22:14:48', null);
INSERT INTO `sys_role_menu` VALUES ('5', '1', '6', '1', '0', '2017-04-16 22:14:58', null);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_role_id` int(11) NOT NULL COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  `delflag` int(11) DEFAULT '0' COMMENT '删除标记',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户角色表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
