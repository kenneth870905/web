import 'package:flutter/material.dart';
import 'package:flutter_app/constant/colors.dart';

void main() => runApp(MyApp2());
//void main() => runApp(new NewRoute());

class MyApp2 extends StatelessWidget {
	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			title: 'MainApp',
			home: MyApp(),
		);
	}
}
class NewRoute extends StatelessWidget {
	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			home: Scaffold(
				appBar: new AppBar(
					title: new Text('Welcome to Flutter123'),
				),
				body: new Container(
					child: FlatButton(onPressed: (){

					}, child: Text('点我返回')),
				),
			) ,
		);
	}
}

class MyApp extends StatelessWidget {
	@override
	Widget build(BuildContext context) {
		return Scaffold(
			appBar: new AppBar(
				title: new Text('哈哈这是首页'),
			),
			body: new Container(
				child: FlatButton(onPressed: (){
					Navigator.push(context,MaterialPageRoute(
						maintainState: ,
//						fullscreenDialog: true,
						builder: (context) => NewRoute()),
					);
				}, child: Text('点我')),
			),
		);
	}
}