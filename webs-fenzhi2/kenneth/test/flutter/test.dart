import 'package:flutter/material.dart';
import 'package:flutter_app/constant/colors.dart';

//void main() => runApp(new MyApp());
void main() => runApp(new WanAndroidApp());

//主页
//StatefulWidget 表示可变状态
class WanAndroidApp extends StatefulWidget {
	@override
	State<StatefulWidget> createState() {
		// 将创建的State返回
		return _WanAndroidAppState();
	}
}

class NewRoute extends StatelessWidget {
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: AppBar(
				title: Text("New route"),
			),
			body: Center(
				child: Text("This is new route"),
			),
		);
	}
}

class _WanAndroidAppState extends State<WanAndroidApp>  with WidgetsBindingObserver {
	int _tabIndex = 0;
	var appBarTitles = ['首页', '发现', '我的'];
	List<BottomNavigationBarItem> _navigationViews;
//	var _navigationViews;
	var _body;
	initData() {
		_body = IndexedStack(
			children: <Widget>[],
			index: _tabIndex,
		);
	}

	@override
	void initState() {
		print('生命周期initState');
		super.initState();
		_navigationViews = <BottomNavigationBarItem>[
			BottomNavigationBarItem(
				icon: const Icon(Icons.home),
				title: Text(appBarTitles[0]),
				backgroundColor: Colors.blue,
			),
			BottomNavigationBarItem(
				icon: const Icon(Icons.widgets),
				title: Text(appBarTitles[1]),
				backgroundColor: Colors.blue,
			),
			BottomNavigationBarItem(
				icon: const Icon(Icons.person),
				title: Text(appBarTitles[2]),
				backgroundColor: Colors.blue,
			),
		];
	}

	final navigatorKey = GlobalKey<NavigatorState>();
	@override
	Widget build(BuildContext context) {
//		initData();
		return new MaterialApp(
//			导航键
			navigatorKey:new GlobalKey(),
			theme: ThemeData(primaryColor: AppColors.color_lvse, accentColor: Colors.blue),
			home: Scaffold(
				appBar: AppBar(
					title: Text(
						appBarTitles[_tabIndex],
					),
					//导航栏右侧菜单
					actions: <Widget>[
						IconButton(
							icon: Icon(Icons.search),
							onPressed: () {
								print('点击了顶部搜索');
								//导航到新路由
								navigatorKey.currentState.push(MaterialPageRoute(builder: (context) {
									return NewRoute();
								}));
//								Navigator.push( context,
//									MaterialPageRoute(builder: (context) {
//										return NewRoute();
//								}));
							})
					],
				),
//				appBar: new AppBar(
//					title: new Text('首页3'),
//				),
				body: new Container(
				),
				bottomNavigationBar:BottomNavigationBar(
//					items: [
//						BottomNavigationBarItem(icon: Icon(Icons.code), title: Text('首页')),
//						BottomNavigationBarItem(icon: Icon(Icons.add), title: Text('其他')),
//						BottomNavigationBarItem(icon: Icon(Icons.print), title: Text('个人中心'))
//					],
//					上面这种方法也可以的 下面这是什么意思我也不知道啊 o(╯□╰)o
					items: _navigationViews.map((BottomNavigationBarItem navigationView) => navigationView).toList(),
					currentIndex:_tabIndex,
					type: BottomNavigationBarType.fixed,
					onTap: (int index) {
						setState(() {
							_tabIndex = index;
						});
					},
				)
			),
		);
	}
}





