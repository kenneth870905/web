/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.5.0
 */
Bridge.assembly("Lottery", function ($asm, globals) {
    "use strict";

    Bridge.define("Lottery.BetHelper", {
        statics: {
            fields: {
                ContentDaXiao: null,
                ContentDanShuang: null,
                ContentDaXiaoDanShuang: null,
                ContentMarkSix49: null,
                ContentPcDanDan10: null,
                Nums: null,
                CtDiPinCai10: null,
                CtDiPingCaiHe3: null,
                CtDiPingCaiHe2: null,
                CtKuaiSan6: null,
                CtKuaiSanHe: null,
                CtPkShi10: null,
                CtPkShiHe: null,
                CtShiShiCai10: null,
                CtShiShiCaiHe3: null,
                CtShiShiCaiHe2: null,
                CtShiShiCaiLongHu: null,
                CtShiShiCaiWan: null,
                CtShiYiXuanWu11: null
            },
            ctors: {
                init: function () {
                    this.ContentDaXiao = System.Array.init(["大", "小"], System.String);
                    this.ContentDanShuang = System.Array.init(["单", "双"], System.String);
                    this.ContentDaXiaoDanShuang = System.Array.init(["大", "小", "单", "双"], System.String);
                    this.ContentMarkSix49 = System.Array.init(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"], System.String);
                    this.ContentPcDanDan10 = System.Array.init(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], System.String);
                    this.Nums = function (_o1) {
                            _o1.set(10000, Lottery.BetHelper.GetShiShiCaiNum());
                            _o1.set(10001, Lottery.BetHelper.GetShiShiCaiNum());
                            _o1.set(10002, Lottery.BetHelper.GetShiShiCaiNum());
                            _o1.set(10003, Lottery.BetHelper.GetShiShiCaiNum());
                            _o1.set(10004, Lottery.BetHelper.GetShiShiCaiNum());
                            _o1.set(10005, Lottery.BetHelper.GetShiShiCaiNum());
                            _o1.set(20000, Lottery.BetHelper.GetPkShiNum());
                            _o1.set(20001, Lottery.BetHelper.GetPkShiNum());
                            _o1.set(20002, Lottery.BetHelper.GetPkShiNum());
                            _o1.set(20003, Lottery.BetHelper.GetPkShiNum());
                            _o1.set(20004, Lottery.BetHelper.GetPkShiNum());
                            _o1.set(30000, Lottery.BetHelper.GetDiPinCaiNum());
                            _o1.set(30001, Lottery.BetHelper.GetDiPinCaiNum());
                            _o1.set(30002, Lottery.BetHelper.GetDiPinCaiNum());
                            _o1.set(40000, Lottery.BetHelper.GetKuaiSanNum());
                            _o1.set(40001, Lottery.BetHelper.GetKuaiSanNum());
                            _o1.set(40002, Lottery.BetHelper.GetKuaiSanNum());
                            _o1.set(40003, Lottery.BetHelper.GetKuaiSanNum());
                            _o1.set(40004, Lottery.BetHelper.GetKuaiSanNum());
                            _o1.set(60000, Lottery.BetHelper.GetShiYiXuanWuNum());
                            _o1.set(60001, Lottery.BetHelper.GetShiYiXuanWuNum());
                            _o1.set(60002, Lottery.BetHelper.GetShiYiXuanWuNum());
                            _o1.set(60003, Lottery.BetHelper.GetShiYiXuanWuNum());
                            _o1.set(60004, Lottery.BetHelper.GetShiYiXuanWuNum());
                            _o1.set(60005, Lottery.BetHelper.GetShiYiXuanWuNum());
                            return _o1;
                        }(new (System.Collections.Generic.Dictionary$2(System.Int32,Function))());
                    this.CtDiPinCai10 = System.Array.init(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], System.String);
                    this.CtDiPingCaiHe3 = System.Array.init(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"], System.String);
                    this.CtDiPingCaiHe2 = System.Array.init(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], System.String);
                    this.CtKuaiSan6 = System.Array.init(["1", "2", "3", "4", "5", "6"], System.String);
                    this.CtKuaiSanHe = System.Array.init(["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], System.String);
                    this.CtPkShi10 = System.Array.init(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"], System.String);
                    this.CtPkShiHe = System.Array.init(["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"], System.String);
                    this.CtShiShiCai10 = System.Array.init(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], System.String);
                    this.CtShiShiCaiHe3 = System.Array.init(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"], System.String);
                    this.CtShiShiCaiHe2 = System.Array.init(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"], System.String);
                    this.CtShiShiCaiLongHu = function (_o1) {
                            _o1.add("龙");
                            _o1.add("虎");
                            _o1.add("和");
                            return _o1;
                        }(new (System.Collections.Generic.List$1(System.String)).ctor());
                    this.CtShiShiCaiWan = function (_o2) {
                            _o2.add("万位");
                            _o2.add("千位");
                            _o2.add("百位");
                            _o2.add("十位");
                            _o2.add("个位");
                            return _o2;
                        }(new (System.Collections.Generic.List$1(System.String)).ctor());
                    this.CtShiYiXuanWu11 = System.Array.init(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"], System.String);
                }
            },
            methods: {
                GetNum: function (lotteryCode, methodCode, content) {
                    return Lottery.BetHelper.Nums.get(lotteryCode)(content, methodCode);
                },
                /**
                 * 获取定位胆
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {Array.<string>}    checkContent    
                 * @param   {number}            length
                 * @return  {number}
                 */
                GetDingWeiDanCount: function (content, checkContent, length) {
                    var count = 0;
                    var c_Split = System.Linq.Enumerable.from(System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return !System.String.isNullOrEmpty(item);
                        }).toList(System.String);

                    if (c_Split.Count !== length) {
                        return count;
                    }

                    c_Split.forEach(function (each) {
                        count = (count + (System.Linq.Enumerable.from(System.String.split(each, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return !System.String.isNullOrEmpty(item) && System.Array.contains(checkContent, item, System.String) && !Bridge.referenceEquals(item, "_");
                            }).count())) | 0;
                    });

                    return count;
                },
                /**
                 * 获取复式组合，每一项不重复
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            max             
                 * @param   {Array.<string>}    checkContent
                 * @return  {number}
                 */
                GetFuShiRowGroupDifferentCount: function (content, max, checkContent) {
                    if (System.String.isNullOrEmpty(content)) {
                        return 0;
                    } else {
                        var bets = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));
                        if (bets.length !== max) {
                            return 0;
                        } else {
                            var list = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(System.String))).$ctor2(max);
                            if (max === 2) {
                                var cha = 0;
                                for (var i = 0; i < max; i = (i + 1) | 0) {
                                    var i_list = System.Linq.Enumerable.from(System.String.split(bets[System.Array.index(i, bets)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                            return System.Array.contains(checkContent, item, System.String);
                                        }).distinct().toList(System.String);
                                    list.add(i_list);

                                    if (i !== 0) {
                                        cha = System.Linq.Enumerable.from(list.getItem(((i - 1) | 0))).intersect(i_list).count();
                                    }
                                }

                                return ((Lottery.BetHelper.CartesianProductCount(System.String, list) - cha) | 0);
                            } else {
                                for (var i1 = 0; i1 < max; i1 = (i1 + 1) | 0) {
                                    var i_list1 = System.Linq.Enumerable.from(System.String.split(bets[System.Array.index(i1, bets)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                            return System.Array.contains(checkContent, item, System.String);
                                        }).distinct().toList(System.String);
                                    list.add(i_list1);
                                }

                                return System.Linq.Enumerable.from(Lottery.BetHelper.CartesianProduct(System.String, list)).where(function (item) {
                                        return System.Linq.Enumerable.from(item).groupBy(function (g) {
                                                return g;
                                            }).count() === max;
                                    }).count();
                            }
                        }
                    }
                },
                /**
                 * 获取多行，总项不可重复，每一项不重复的单式注数
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            max             
                 * @param   {Array.<string>}    checkContent    
                 * @param   {number}            split
                 * @return  {number}
                 */
                GetDanShiRowGroupDifferentCount: function (content, max, checkContent, split) {
                    var contents = System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}));

                    return System.Linq.Enumerable.from(contents).distinct().count(function (item) {
                        return System.Linq.Enumerable.from(System.String.split(item.trim(), [split].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (w) {
                                return System.Array.contains(checkContent, w, System.String);
                            }).groupBy(function (g) {
                            return g;
                        }).count() === max;
                    });
                },
                /**
                 * 获取多行，总项不可重复，每一项排序后不重复的单式注数
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            max             
                 * @param   {Array.<string>}    checkContent    
                 * @param   {number}            split
                 * @return  {number}
                 */
                GetDanShiRowGroupOrderDifferentCount: function (content, max, checkContent, split) {
                    var contents = System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}));

                    return System.Linq.Enumerable.from(contents).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(System.String.split(item.trim(), [split].map(function(i) {{ return String.fromCharCode(i); }}))).orderBy(function (o) {
                                        return o;
                                    })).join(String.fromCharCode(split));
                        }).distinct().count(function (item) {
                        return System.Linq.Enumerable.from(System.String.split(item, [split].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (w) {
                                return System.Array.contains(checkContent, w, System.String);
                            }).groupBy(function (g) {
                            return g;
                        }).count() === max;
                    });
                },
                /**
                 * 获取，总项不可重复，每一项可重复的单式注数
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            max             
                 * @param   {Array.<string>}    checkContent
                 * @return  {number}
                 */
                GetDanShiCount: function (content, max, checkContent) {
                    return System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).distinct().count(function (item) {
                        return item.length === max && System.Linq.Enumerable.from(item).count(function (c) {
                                return System.Array.contains(checkContent, String.fromCharCode(c), System.String);
                            }) === max;
                    });
                },
                /**
                 * 获取字符串不重复一行数据的组合
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            max             
                 * @param   {Array.<string>}    checkContent
                 * @return  {number}
                 */
                GetOneStringCombinationCount: function (content, max, checkContent) {
                    if (max === 1) {
                        return System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(checkContent, item, System.String);
                            }).distinct().count();
                    } else {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(checkContent, item, System.String);
                            }).distinct().toArray(System.String), max);
                    }
                },
                /**
                 * 笛卡尔乘积
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {Function}                             T           
                 * @param   {System.Collections.Generic.List$1}    lstSplit
                 * @return  {System.Collections.Generic.List$1}
                 */
                CartesianProduct: function (T, lstSplit) {
                    var count = 1;
                    lstSplit.forEach(function (item) {
                        count = Bridge.Int.mul(count, item.Count);
                    });
                    //count = lstSplit.Aggregate(1, (result, next) => result * next.Count);

                    var lstResult = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(T))).ctor();

                    for (var i = 0; i < count; i = (i + 1) | 0) {
                        var lstTemp = { v : new (System.Collections.Generic.List$1(T)).ctor() };
                        var j = { v : 1 };
                        lstSplit.forEach((function ($me, j, lstTemp) {
                            return function (item) {
                                j.v = Bridge.Int.mul(j.v, item.Count);
                                lstTemp.v.add(item.getItem((((Bridge.Int.div(i, (((Bridge.Int.div(count, j.v)) | 0)))) | 0)) % item.Count));
                            };
                        })(this, j, lstTemp));
                        lstResult.add(lstTemp.v);
                    }
                    return lstResult;
                },
                /**
                 * 笛卡尔
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {Function}                             T           
                 * @param   {System.Collections.Generic.List$1}    lstSplit
                 * @return  {number}
                 */
                CartesianProductCount: function (T, lstSplit) {
                    var count = 1;

                    count = System.Linq.Enumerable.from(lstSplit).aggregate(1, function (result, next) {
                            return Bridge.Int.mul(result, next.Count);
                        });
                    return count;
                },
                /**
                 * 递归算法求数组的组合(私有成员)
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {Function}                           T       
                 * @param   {System.Collections.Generic.List}    list    返回的范型
                 * @param   {Array.<T>}                          t       所求数组
                 * @param   {number}                             n       辅助变量
                 * @param   {number}                             m       辅助变量
                 * @param   {Array.<number>}                     b       辅助数组
                 * @param   {number}                             M       辅助变量M
                 * @return  {void}
                 */
                GetCombination$1: function (T, list, t, n, m, b, M) {
                    for (var i = n; i >= m; i = (i - 1) | 0) {
                        b[System.Array.index(((m - 1) | 0), b)] = (i - 1) | 0;
                        if (m > 1) {
                            Lottery.BetHelper.GetCombination$1(T, list, t, ((i - 1) | 0), ((m - 1) | 0), b, M);
                        } else {
                            if (list.v == null) {
                                list.v = new (System.Collections.Generic.List$1(System.Array.type(T))).ctor();
                            }
                            var temp = System.Array.init(M, function (){
                                return Bridge.getDefaultValue(T);
                            }, T);
                            for (var j = 0; j < b.length; j = (j + 1) | 0) {
                                temp[System.Array.index(j, temp)] = t[System.Array.index(b[System.Array.index(j, b)], t)];
                            }
                            list.v.add(temp);
                        }
                    }
                },
                /**
                 * 求数组中n个元素的组合
                 *
                 * @static
                 * @public
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {Function}                             T    
                 * @param   {Array.<T>}                            t    所求数组
                 * @param   {number}                               n    元素个数
                 * @return  {System.Collections.Generic.List$1}         数组中n个元素的组合的范型
                 */
                GetCombination: function (T, t, n) {
                    if (t.length < n) {
                        return null;
                    }
                    var temp = System.Array.init(n, 0, System.Int32);
                    var list = { v : new (System.Collections.Generic.List$1(System.Array.type(T))).ctor() };
                    Lottery.BetHelper.GetCombination$1(T, list, t, t.length, n, temp, n);
                    return list.v;
                },
                GetCombinationCount: function (T, t, n) {
                    if (t.length < n) {
                        return 0;
                    }
                    var temp = System.Array.init(n, 0, System.Int32);
                    var list = { v : new (System.Collections.Generic.List$1(System.Array.type(T))).ctor() };
                    Lottery.BetHelper.GetCombination$1(T, list, t, t.length, n, temp, n);
                    return list.v.Count;
                },
                GetCombinationCount$1: function (T, list1, list2, size1, size2) {
                    var count = 0;
                    var outLoop;
                    var inLoop;

                    var size;
                    if (size1 < size2) {
                        outLoop = list1;
                        inLoop = list2;
                        size = size2;
                    } else {
                        inLoop = list1;
                        outLoop = list2;
                        size = size1;
                    }

                    for (var i = 0; i < outLoop.Count; i = (i + 1) | 0) {
                        var repeat = 0;
                        if (inLoop.contains(outLoop.getItem(i))) {
                            repeat = 1;
                        }
                        var setsize = (inLoop.Count - repeat) | 0;
                        if (setsize >= size) {
                            count = (count + System.Int64.clip32(Lottery.BetHelper.CombinationCr(setsize, size))) | 0;
                        }
                    }

                    return count;
                },
                CombinationCr: function (n, r) {
                    // naive: return Factorial(n) / (Factorial(r) * Factorial(n - r));
                    return Lottery.BetHelper.CombinationPr(n, r).div(Lottery.BetHelper.Factorial(r));
                },
                CombinationPr: function (n, r) {
                    // naive: return Factorial(n) / Factorial(n - r);
                    return Lottery.BetHelper.FactorialDivision(n, ((n - r) | 0));
                },
                FactorialDivision: function (topFactorial, divisorFactorial) {
                    var result = System.Int64(1);
                    for (var i = topFactorial; i > divisorFactorial; i = (i - 1) | 0) {
                        result = result.mul(System.Int64(i));
                    }
                    return result;
                },
                Factorial: function (i) {
                    if (i <= 1) {
                        return System.Int64(1);
                    }
                    return System.Int64(i).mul(Lottery.BetHelper.Factorial(((i - 1) | 0)));
                },
                GetDiPinCaiNum: function () {
                    return Lottery.BetHelper.CalculateDiPinCai;
                },
                /**
                 * 计算低频彩
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content       
                 * @param   {number}    methodCode
                 * @return  {number}
                 */
                CalculateDiPinCai: function (content, methodCode) {
                    var $t;
                    if (methodCode === 100) {
                        return Lottery.BetHelper.GetDingWeiDanCount(content, Lottery.BetHelper.CtDiPinCai10, 3); //定位胆
                    } else if (methodCode === 120) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtDiPinCai10, item, System.String);
                            }).toArray(System.String), 1);
                    } else if (methodCode === 200 || methodCode === 220) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 2, Lottery.BetHelper.CtDiPinCai10);
                    } else if (methodCode === 201 || methodCode === 221) {
                        return Lottery.BetHelper.GetDanShiCount(content, 2, Lottery.BetHelper.CtDiPinCai10);
                    } else if (methodCode === 202 || methodCode === 222) {
                        return Lottery.BetHelper.GetZhiXuanHeZhi(content, 2, Lottery.BetHelper.CtDiPingCaiHe2);
                    } else if (methodCode === 204 || methodCode === 224) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtDiPinCai10, item, System.String);
                            }).toArray(System.String), 2);
                    } else if (methodCode === 205 || methodCode === 225) {

                        var str = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return item.length === 2;
                            }).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(item).where(function (w) {
                                        return System.Array.contains(Lottery.BetHelper.CtDiPinCai10, String.fromCharCode(w), System.String);
                                    }).select(function (s) {
                                    return System.Int32.parse(String.fromCharCode(s));
                                })).join("");
                        }).distinct();

                        return System.Linq.Enumerable.from(str).count(function (item) {
                                return System.Linq.Enumerable.from(item).groupBy(function (g) {
                                        return g;
                                    }).count() === 2;
                            });

                    } else if (methodCode === 300) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 3, Lottery.BetHelper.CtDiPinCai10);
                    } else if (methodCode === 301) {
                        return Lottery.BetHelper.GetDanShiCount(content, 3, Lottery.BetHelper.CtDiPinCai10);
                    } else if (methodCode === 302) {
                        return Lottery.BetHelper.GetZhiXuanHeZhi(content, 3, Lottery.BetHelper.CtDiPingCaiHe3);
                    } else if (methodCode === 303) {
                        return Bridge.Int.mul(Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtDiPinCai10, item, System.String);
                            }).toArray(System.String), 2), 2);
                    } else if (methodCode === 304) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtDiPinCai10, item, System.String);
                            }).toArray(System.String), 3);
                    } else if (methodCode === 305) {

                        var str1 = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return item.length === 3;
                            }).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(item).where(function (w) {
                                        return System.Array.contains(Lottery.BetHelper.CtDiPinCai10, String.fromCharCode(w), System.String);
                                    }).select(function (s) {
                                    return System.Int32.parse(String.fromCharCode(s));
                                }).orderBy(function (o) {
                                    return o;
                                })).join("");
                        }).distinct();

                        var count = 0;
                        $t = Bridge.getEnumerator(str1, System.String);
                        try {
                            while ($t.moveNext()) {
                                var s = $t.Current;
                                var s_list = System.Linq.Enumerable.from(s).select(function (item) {
                                        return item;
                                    }).orderBy(function (item) {
                                    return item;
                                });

                                var s_count = System.Linq.Enumerable.from(s_list).groupBy(function (item) {
                                        return item;
                                    }).count();
                                if (s_count === 3 || s_count === 2) {
                                    count = (count + 1) | 0;
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$dispose();
                            }
                        }
                        return count;

                    }
                    return 0;
                },
                GetKuaiSanNum: function () {
                    return Lottery.BetHelper.CalculateKuaiSan;
                },
                /**
                 * 计算pk拾注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content       
                 * @param   {number}    methodCode
                 * @return  {number}
                 */
                CalculateKuaiSan: function (content, methodCode) {
                    if (methodCode === 200) {
                        return Lottery.BetHelper.GetKuaiSanDanTuoCount(content); //二同号标准
                    } else if (methodCode === 201) {
                        return Lottery.BetHelper.GetKuaiSanSdCount(content, 2); //二同号手动
                    } else if (methodCode === 202) {
                        return System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).count(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtKuaiSan6, item, System.String);
                            }); //二同号复选
                    } else if (methodCode === 220) {
                        return Lottery.BetHelper.GetKuaiSanBzCount(content, 2); //二不同标准
                    } else if (methodCode === 221) {
                        return Lottery.BetHelper.GetKuaiSanBtSdCount(content, 2); //二不同手动
                    } else if (methodCode === 222) {
                        return Lottery.BetHelper.GetKuaiSanDanTuoCount(content); //二不同胆拖选号
                    } else if (methodCode === 300) {
                        return System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).count(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtKuaiSan6, item, System.String);
                            }); //三同号单选
                    } else if (methodCode === 301) {
                        if (Bridge.referenceEquals(content, "111,222,333,444,555,666")) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (methodCode === 333) {
                        //三连号通选
                        if (Bridge.referenceEquals(content, "123,234,345,456")) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (methodCode === 310) {
                        return Lottery.BetHelper.GetKuaiSanBzCount(content, 3); //三不同标准
                    } else if (methodCode === 311) {
                        return Lottery.BetHelper.GetKuaiSanBtSdCount(content, 3); //三不同手动
                    } else if (methodCode === 600) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.CtKuaiSanHe); //和值
                    }

                    return 0;
                },
                /**
                 * 不同号标准
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    xing
                 * @return  {number}
                 */
                GetKuaiSanBzCount: function (content, xing) {
                    var list = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return System.Array.contains(Lottery.BetHelper.CtKuaiSan6, item, System.String);
                        }).distinct().toArray(System.String);
                    return Lottery.BetHelper.GetCombinationCount(System.String, list, xing);
                },
                /**
                 * 获取不同手动注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    xing
                 * @return  {number}
                 */
                GetKuaiSanBtSdCount: function (content, xing) {
                    var contents = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(item).orderBy(function (o) {
                                        return o;
                                    }).select(function (s) {
                                    return String.fromCharCode(s);
                                })).join("");
                        }).distinct();

                    return System.Linq.Enumerable.from(contents).count(function (item) {
                            return System.Linq.Enumerable.from(item).distinct().count(function (c) {
                                return System.Array.contains(Lottery.BetHelper.CtKuaiSan6, String.fromCharCode(c), System.String);
                            }) === xing;
                        });
                },
                /**
                 * 获取二同号手动
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    xing
                 * @return  {number}
                 */
                GetKuaiSanSdCount: function (content, xing) {
                    var contents = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(item).orderBy(function (o) {
                                        return o;
                                    }).select(function (s) {
                                    return String.fromCharCode(s);
                                })).join("");
                        }).distinct();

                    return System.Linq.Enumerable.from(contents).count(function (item) {
                            return System.Linq.Enumerable.from(item).where(function (w) {
                                    return System.Array.contains(Lottery.BetHelper.CtKuaiSan6, String.fromCharCode(w), System.String);
                                }).groupBy(function (g) {
                                return g;
                            }).count() === xing;
                        });
                },
                /**
                 * 获取胆拖选号
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content
                 * @return  {number}
                 */
                GetKuaiSanDanTuoCount: function (content) {
                    var contents = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));

                    if (contents.length !== 2) {
                        return 0;
                    }

                    if (contents[System.Array.index(0, contents)].length !== 1 && !System.Array.contains(Lottery.BetHelper.CtKuaiSan6, contents[System.Array.index(0, contents)], System.String)) {
                        return 0;
                    }

                    if (System.String.contains(contents[System.Array.index(0, contents)],"_")) {
                        return 0;
                    }

                    if (System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(1, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).any(function (item) {
                            return Bridge.referenceEquals(item, contents[System.Array.index(0, contents)]);
                        })) {
                        return 0;
                    }

                    return System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(1, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).distinct().count(function (item) {
                        return System.Array.contains(Lottery.BetHelper.CtKuaiSan6, item, System.String);
                    });
                },
                GetPkShiNum: function () {
                    return Lottery.BetHelper.CalculatePkShi;
                },
                /**
                 * 计算pk拾注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content       
                 * @param   {number}    methodCode
                 * @return  {number}
                 */
                CalculatePkShi: function (content, methodCode) {
                    if (methodCode === 100 || methodCode === 101) {
                        return Lottery.BetHelper.GetDingWeiDanCount(content, Lottery.BetHelper.CtPkShi10, 5); //定位胆
                    } else if (methodCode === 120) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.CtPkShi10); //前一
                    } else if (methodCode === 200) {
                        return Lottery.BetHelper.GetFuShiRowGroupDifferentCount(content, 2, Lottery.BetHelper.CtPkShi10); //前二复式
                    } else if (methodCode === 201) {
                        return Lottery.BetHelper.GetDanShiRowGroupDifferentCount(content, 2, Lottery.BetHelper.CtPkShi10, 32); //前二单式
                    } else if (methodCode === 300) {
                        return Lottery.BetHelper.GetFuShiRowGroupDifferentCount(content, 3, Lottery.BetHelper.CtPkShi10); //前三单式 --todo时时彩组选优化到此方法
                    } else if (methodCode === 301) {
                        return Lottery.BetHelper.GetDanShiRowGroupDifferentCount(content, 3, Lottery.BetHelper.CtPkShi10, 32); //前三单式
                    } else if (methodCode === 401 || methodCode === 402 || methodCode === 403) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.ContentDaXiao); //大小
                    } else if (methodCode === 501 || methodCode === 502 || methodCode === 503) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.ContentDanShuang); //单双
                    } else if (methodCode === 601) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.ContentDaXiaoDanShuang); //冠亚和大小单双
                    } else if (methodCode === 602) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.CtPkShiHe); //冠亚和和值
                    }

                    return 0;
                },
                GetShiShiCaiNum: function () {
                    return Lottery.BetHelper.CalculateShiShiCai;
                },
                /**
                 * 计算时时彩注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content       
                 * @param   {number}    methodCode
                 * @return  {number}
                 */
                CalculateShiShiCai: function (content, methodCode) {
                    var $t;
                    if (methodCode === 100) {
                        return Lottery.BetHelper.GetDingWeiDanCount(content, Lottery.BetHelper.CtShiShiCai10, 5);
                    } else if (methodCode === 500) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 5, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 501) {
                        return Lottery.BetHelper.GetDanShiCount(content, 5, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 502) {
                        return Bridge.Int.mul(Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 5, Lottery.BetHelper.CtShiShiCai10), 5);
                    } else if (methodCode === 503) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 5);
                    } else if (methodCode === 504) {
                        return Lottery.BetHelper.GetZuXuanCount(content, 1, 3);
                    } else if (methodCode === 505) {
                        return Lottery.BetHelper.GetZuXuanCount(content, 2, 1);
                    } else if (methodCode === 506 || methodCode === 404 || methodCode === 424) {
                        return Lottery.BetHelper.GetZuXuanCount(content, 1, 2);
                    } else if (methodCode === 507 || methodCode === 508 || methodCode === 406 || methodCode === 426) {
                        return Lottery.BetHelper.GetZuXuanCount(content, 1, 1);
                    } else if (methodCode === 400 || methodCode === 420) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 4, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 403 || methodCode === 423) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 4);
                    } else if (methodCode === 402 || methodCode === 422) {
                        return Bridge.Int.mul(Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 4, Lottery.BetHelper.CtShiShiCai10), 4);
                    } else if (methodCode === 401 || methodCode === 421) {
                        return Lottery.BetHelper.GetDanShiCount(content, 4, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 405 || methodCode === 425 || methodCode === 123 || methodCode === 124 || methodCode === 125) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 2);
                    } else if (methodCode === 300 || methodCode === 320 || methodCode === 340) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 3, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 301 || methodCode === 321 || methodCode === 341) {
                        return Lottery.BetHelper.GetDanShiCount(content, 3, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 302 || methodCode === 322 || methodCode === 342) {
                        return Lottery.BetHelper.GetZhiXuanHeZhi(content, 3, Lottery.BetHelper.CtShiShiCaiHe3);
                    } else if (methodCode === 303 || methodCode === 323 || methodCode === 343) {
                        return Bridge.Int.mul(Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 2), 2);
                    } else if (methodCode === 304 || methodCode === 324 || methodCode === 344) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 3);
                    } else if (methodCode === 305 || methodCode === 325 || methodCode === 345) {

                        var str = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return item.length === 3;
                            }).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(item).where(function (w) {
                                        return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, String.fromCharCode(w), System.String);
                                    }).select(function (s) {
                                    return System.Int32.parse(String.fromCharCode(s));
                                }).orderBy(function (o) {
                                    return o;
                                })).join("");
                        }).distinct();

                        var count = 0;
                        $t = Bridge.getEnumerator(str, System.String);
                        try {
                            while ($t.moveNext()) {
                                var s = $t.Current;
                                var s_list = System.Linq.Enumerable.from(s).select(function (item) {
                                        return item;
                                    }).orderBy(function (item) {
                                    return item;
                                });

                                var s_count = System.Linq.Enumerable.from(s_list).groupBy(function (item) {
                                        return item;
                                    }).count();
                                if (s_count === 3 || s_count === 2) {
                                    count = (count + 1) | 0;
                                }
                            }
                        } finally {
                            if (Bridge.is($t, System.IDisposable)) {
                                $t.System$IDisposable$dispose();
                            }
                        }
                        return count;

                    } else if (methodCode === 200 || methodCode === 220) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 2, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 201 || methodCode === 221) {
                        return Lottery.BetHelper.GetDanShiCount(content, 2, Lottery.BetHelper.CtShiShiCai10);
                    } else if (methodCode === 202 || methodCode === 222) {
                        return Lottery.BetHelper.GetZhiXuanHeZhi(content, 2, Lottery.BetHelper.CtShiShiCaiHe3);
                    } else if (methodCode === 203 || methodCode === 223) {
                        return Lottery.BetHelper.GetShiShiCaiFuShiCount(content, 2, Lottery.BetHelper.ContentDaXiaoDanShuang);
                    } else if (methodCode === 204 || methodCode === 224) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 2);
                    } else if (methodCode === 205 || methodCode === 225) {

                        var str1 = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return item.length === 2;
                            }).select(function (item) {
                            return Bridge.toArray(System.Linq.Enumerable.from(item).where(function (w) {
                                        return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, String.fromCharCode(w), System.String);
                                    }).select(function (s1) {
                                    return System.Int32.parse(String.fromCharCode(s1));
                                })).join("");
                        }).distinct();

                        return System.Linq.Enumerable.from(str1).count(function (item) {
                                return System.Linq.Enumerable.from(item).groupBy(function (g) {
                                        return g;
                                    }).count() === 2;
                            });

                    } else if (methodCode === 120 || methodCode === 121 || methodCode === 122) {
                        return Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).toArray(System.String), 1);
                    } else if (methodCode === 126) {
                        return Lottery.BetHelper.GetRenXuanCount(content, 2); //任二复式
                    } else if (methodCode === 127) {
                        return Lottery.BetHelper.GetRenXuanDanShi(content, 2); //任二单式
                    } else if (methodCode === 128) {
                        return Lottery.BetHelper.GetRenXuanZuXuanCount(content, 2, 2); //任选二_组选
                    } else if (methodCode === 129) {
                        return Lottery.BetHelper.GetRenXuanCount(content, 3); //任三复式
                    } else if (methodCode === 130) {
                        return Lottery.BetHelper.GetRenXuanDanShi(content, 3); //任三单式
                    } else if (methodCode === 131) {
                        return Bridge.Int.mul(Lottery.BetHelper.GetRenXuanZuXuanCount(content, 3, 2), 2); //任选三_组三
                    } else if (methodCode === 132) {
                        return Lottery.BetHelper.GetRenXuanZuXuanCount(content, 3, 3); //任选三_组六
                    } else if (methodCode === 133) {
                        return Lottery.BetHelper.GetRenXuanHunHeCount(content); //任选三_混合组选
                    } else if (methodCode === 134) {
                        return Lottery.BetHelper.GetRenXuanCount(content, 4); //任四复式
                    } else if (methodCode === 135) {
                        return Lottery.BetHelper.GetRenXuanDanShi(content, 4); //任四复式
                    } else if (methodCode === 600 || methodCode === 601 || methodCode === 602) {
                        return Lottery.BetHelper.GetZhiXuanChaZhi(content, 3);
                    } else if (methodCode === 603 || methodCode === 604) {
                        return Lottery.BetHelper.GetZhiXuanChaZhi(content, 2);
                    } else if (methodCode === 620 || methodCode === 621 || methodCode === 622 || methodCode === 623) {
                        return System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                            }).distinct().count();
                    } else if (methodCode === 650 || methodCode === 651 || methodCode === 652 || methodCode === 653 || methodCode === 654 || methodCode === 655 || methodCode === 656 || methodCode === 657 || methodCode === 658 || methodCode === 659) {
                        return System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).distinct().count(function (item) {
                            return Lottery.BetHelper.CtShiShiCaiLongHu.contains(item);
                        }); //龙虎和
                    }

                    return 0;
                },
                /**
                 * // 获取单式注数
                //
                 * 获取复式组合注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            max             
                 * @param   {Array.<string>}    checkContent
                 * @return  {number}
                 */
                GetShiShiCaiFuShiCount: function (content, max, checkContent) {
                    if (System.String.isNullOrEmpty(content)) {
                        return 0;
                    } else {
                        var bets = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));
                        if (bets.length !== max) {
                            return 0;
                        } else {
                            var list = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(System.String))).$ctor2(max);

                            for (var i = 0; i < max; i = (i + 1) | 0) {
                                list.add(System.Linq.Enumerable.from(System.String.split(bets[System.Array.index(i, bets)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                                        return System.Array.contains(checkContent, item, System.String);
                                    }).distinct().toList(System.String));
                            }

                            var count = Lottery.BetHelper.CartesianProductCount(System.String, list);

                            return count;
                        }
                    }
                },
                /**
                 * 获取任选组合数量
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    wanSize    
                 * @param   {number}    numSize
                 * @return  {number}
                 */
                GetRenXuanZuXuanCount: function (content, wanSize, numSize) {
                    var contents = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));

                    if (contents.length !== 2) {
                        return 0;
                    }

                    var wans = System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(0, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return Lottery.BetHelper.CtShiShiCaiWan.contains(item);
                        }).distinct().toArray(System.String);
                    var nums = System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(1, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                        }).distinct().toArray(System.String);

                    return Bridge.Int.mul(Lottery.BetHelper.GetCombinationCount(System.String, wans, wanSize), Lottery.BetHelper.GetCombinationCount(System.String, nums, numSize));
                },
                /**
                 * 获取任选混合组选数量
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content
                 * @return  {number}
                 */
                GetRenXuanHunHeCount: function (content) {
                    var contents = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));

                    if (contents.length !== 2) {
                        return 0;
                    }

                    var wans = System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(0, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return Lottery.BetHelper.CtShiShiCaiWan.contains(item);
                        }).distinct().toArray(System.String);

                    var nums = (System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(1, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).select(function (split) {
                            return { split: split, groupCount: System.Linq.Enumerable.from(split).where(function (item) {
                                    return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, String.fromCharCode(item), System.String);
                                }).groupBy(function (g) {
                                return g;
                            }).count() };
                        }).where(function (x0) {
                        return x0.groupCount === 2 || x0.groupCount === 3;
                    }).where(function (x1) {
                        return x1.split.length === 3;
                    }).select(function (x2) {
                        return x2.split;
                    })).toArray(System.String);

                    return Bridge.Int.mul(Lottery.BetHelper.GetCombinationCount(System.String, wans, 3), nums.length);
                },
                /**
                 * 获取任选单式数量
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    xing
                 * @return  {number}
                 */
                GetRenXuanDanShi: function (content, xing) {
                    var contents = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));

                    if (contents.length !== 2) {
                        return 0;
                    }

                    var count = Lottery.BetHelper.GetCombinationCount(System.String, System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(0, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return Lottery.BetHelper.CtShiShiCaiWan.contains(item);
                        }).distinct().toArray(System.String), xing);

                    return Bridge.Int.mul(count, System.Linq.Enumerable.from(System.String.split(contents[System.Array.index(1, contents)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).count(function (item) {
                            return !System.String.isNullOrEmpty(item) && item.length === xing && System.Int32.parse(item) >= 0;
                        }));
                },
                /**
                 * 获取任选注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    xing
                 * @return  {number}
                 */
                GetRenXuanCount: function (content, xing) {
                    var contents = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));

                    var contentInts = System.Linq.Enumerable.from(contents).select(function (item) {
                            return System.Linq.Enumerable.from(System.String.split(item, [44].map(function(i) {{ return String.fromCharCode(i); }}))).count(function (c) {
                                    return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, c, System.String);
                                });
                        }).toList(System.Int32);
                    var total = 0;

                    if (xing === 2) {
                        for (var i = 0; i < contents.length; i = (i + 1) | 0) {
                            for (var j = (i + 1) | 0; j < contents.length; j = (j + 1) | 0) {
                                total = (total + (Bridge.Int.mul(contentInts.getItem(i), contentInts.getItem(j)))) | 0;
                            }
                        }
                    } else if (xing === 3) {
                        for (var i1 = 0; i1 < contents.length; i1 = (i1 + 1) | 0) {
                            for (var j1 = (i1 + 1) | 0; j1 < contents.length; j1 = (j1 + 1) | 0) {
                                for (var k = (j1 + 1) | 0; k < contents.length; k = (k + 1) | 0) {
                                    total = (total + (Bridge.Int.mul(Bridge.Int.mul(contentInts.getItem(i1), contentInts.getItem(j1)), contentInts.getItem(k)))) | 0;
                                }
                            }
                        }
                    } else if (xing === 4) {
                        for (var i2 = 0; i2 < contents.length; i2 = (i2 + 1) | 0) {
                            for (var j2 = (i2 + 1) | 0; j2 < contents.length; j2 = (j2 + 1) | 0) {
                                for (var k1 = (j2 + 1) | 0; k1 < contents.length; k1 = (k1 + 1) | 0) {
                                    for (var x = (k1 + 1) | 0; x < contents.length; x = (x + 1) | 0) {
                                        total = (total + (Bridge.Int.mul(Bridge.Int.mul(Bridge.Int.mul(contentInts.getItem(i2), contentInts.getItem(j2)), contentInts.getItem(k1)), contentInts.getItem(x)))) | 0;
                                    }
                                }
                            }
                        }
                    }

                    return total;
                },
                /**
                 * 获取组选注数
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    size1      
                 * @param   {number}    size2
                 * @return  {number}
                 */
                GetZuXuanCount: function (content, size1, size2) {
                    var bets = System.String.split(content, [124].map(function(i) {{ return String.fromCharCode(i); }}));

                    var bets1 = System.Linq.Enumerable.from(System.String.split(bets[System.Array.index(0, bets)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                        }).distinct().toList(System.String);
                    var bets2 = System.Linq.Enumerable.from(System.String.split(bets[System.Array.index(1, bets)], [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return System.Array.contains(Lottery.BetHelper.CtShiShiCai10, item, System.String);
                        }).distinct().toList(System.String);

                    return Lottery.BetHelper.GetCombinationCount$1(System.String, bets1, bets2, size1, size2);
                },
                /**
                 * 求指定位数的和值
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}            content         
                 * @param   {number}            xing            几星玩法
                 * @param   {Array.<string>}    checkContent
                 * @return  {number}
                 */
                GetZhiXuanHeZhi: function (content, xing, checkContent) {
                    var contents = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return System.Array.contains(checkContent, item, System.String);
                        }).select(function (item) {
                        return System.Int32.parse(item);
                    });

                    var temp = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(System.Int32))).ctor();
                    for (var i = 0; i < xing; i = (i + 1) | 0) {
                        var list = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                        for (var j = 0; j < 10; j = (j + 1) | 0) {
                            list.add(j);
                        }

                        temp.add(list);
                    }

                    var products = Lottery.BetHelper.CartesianProduct(System.Int32, temp);

                    return System.Linq.Enumerable.from(products).select(function (item) {
                            var sum = 0;
                            for (var i1 = 0; i1 < xing; i1 = (i1 + 1) | 0) {
                                sum = (sum + item.getItem(i1)) | 0;
                            }

                            return sum;
                        }).count(function (item) {
                        return System.Linq.Enumerable.from(contents).contains(item);
                    });
                },
                /**
                 * 求指定位数的差值
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content    
                 * @param   {number}    xing       几星玩法
                 * @return  {number}
                 */
                GetZhiXuanChaZhi: function (content, xing) {
                    var contents = System.Linq.Enumerable.from(System.String.split(content, [44].map(function(i) {{ return String.fromCharCode(i); }}))).where(function (item) {
                            return System.Array.contains(Lottery.BetHelper.CtShiShiCaiHe3, item, System.String);
                        }).select(function (item) {
                        return System.Int32.parse(item);
                    });

                    var temp = new (System.Collections.Generic.List$1(System.Collections.Generic.List$1(System.Int32))).ctor();
                    for (var i = 0; i < xing; i = (i + 1) | 0) {
                        var list = new (System.Collections.Generic.List$1(System.Int32)).ctor();
                        for (var j = 0; j < 10; j = (j + 1) | 0) {
                            list.add(j);
                        }

                        temp.add(list);
                    }

                    var products = Lottery.BetHelper.CartesianProduct(System.Int32, temp);

                    return System.Linq.Enumerable.from(products).select(function (item) {
                            return ((System.Linq.Enumerable.from(item).max() - System.Linq.Enumerable.from(item).min()) | 0);
                        }).count(function (item) {
                        return System.Linq.Enumerable.from(contents).contains(item);
                    });
                },
                GetShiYiXuanWuNum: function () {
                    return Lottery.BetHelper.CalculateShiYiXuanWu;
                },
                /**
                 * 计算11选5
                 *
                 * @static
                 * @private
                 * @this Lottery.BetHelper
                 * @memberof Lottery.BetHelper
                 * @param   {string}    content       
                 * @param   {number}    methodCode
                 * @return  {number}
                 */
                CalculateShiYiXuanWu: function (content, methodCode) {
                    if (methodCode === 100) {
                        return Lottery.BetHelper.GetDingWeiDanCount(content, Lottery.BetHelper.CtShiYiXuanWu11, 5); //定位胆
                    } else if (methodCode === 200) {
                        return Lottery.BetHelper.GetFuShiRowGroupDifferentCount(content, 2, Lottery.BetHelper.CtShiYiXuanWu11); //前二码_直选_复式
                    } else if (methodCode === 201 || methodCode === 211) {
                        return Lottery.BetHelper.GetDanShiRowGroupDifferentCount(content, 2, Lottery.BetHelper.CtShiYiXuanWu11, 32); //前二码_直选_单式,前二码_组选_单式
                    } else if (methodCode === 210) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 2, Lottery.BetHelper.CtShiYiXuanWu11); //前二码_组选_复式
                    } else if (methodCode === 300) {
                        return Lottery.BetHelper.GetFuShiRowGroupDifferentCount(content, 3, Lottery.BetHelper.CtShiYiXuanWu11); //前三码_直选_复式
                    } else if (methodCode === 301 || methodCode === 311) {
                        return Lottery.BetHelper.GetDanShiRowGroupDifferentCount(content, 3, Lottery.BetHelper.CtShiYiXuanWu11, 32); //前三码_直选_单式,前三码_组选_单式
                    } else if (methodCode === 310) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 3, Lottery.BetHelper.CtShiYiXuanWu11); //前三码_组选_复式
                    } else if (methodCode === 900) {
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, 1, Lottery.BetHelper.CtShiYiXuanWu11); //不定胆_前三
                    } else if (methodCode === 401 || methodCode === 402 || methodCode === 403 || methodCode === 404 || methodCode === 405 || methodCode === 406 || methodCode === 407 || methodCode === 408) {
                        var max = function (_o1) {
                                _o1.set(401, 1);
                                _o1.set(402, 2);
                                _o1.set(403, 3);
                                _o1.set(404, 4);
                                _o1.set(405, 5);
                                _o1.set(406, 6);
                                _o1.set(407, 7);
                                _o1.set(408, 8);
                                return _o1;
                            }(new (System.Collections.Generic.Dictionary$2(System.Int32,System.Int32))());
                        return Lottery.BetHelper.GetOneStringCombinationCount(content, max.get(methodCode), Lottery.BetHelper.CtShiYiXuanWu11); //任选_复式
                    } else if (methodCode === 411 || methodCode === 412 || methodCode === 413 || methodCode === 414 || methodCode === 415 || methodCode === 416 || methodCode === 417 || methodCode === 418) {
                        var max1 = function (_o2) {
                                _o2.set(411, 1);
                                _o2.set(412, 2);
                                _o2.set(413, 3);
                                _o2.set(414, 4);
                                _o2.set(415, 5);
                                _o2.set(416, 6);
                                _o2.set(417, 7);
                                _o2.set(418, 8);
                                return _o2;
                            }(new (System.Collections.Generic.Dictionary$2(System.Int32,System.Int32))());
                        return Lottery.BetHelper.GetDanShiRowGroupOrderDifferentCount(content, max1.get(methodCode), Lottery.BetHelper.CtShiYiXuanWu11, 32); //任选_单式
                    }

                    return 0;
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJMb3R0ZXJ5LmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJCZXRIZWxwZXIuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FRK0NBOzRDQUNHQTtrREFDTUE7NENBQ05BOzZDQU1DQTtnQ0FHbUJBLEFBQTRFQSxVQUFDQTs0QkFBT0EsZUFBWUE7NEJBQWtCQSxlQUFZQTs0QkFBa0JBLGVBQVlBOzRCQUFrQkEsZUFBWUE7NEJBQWtCQSxlQUFZQTs0QkFBa0JBLGVBQVlBOzRCQUFrQkEsZUFBWUE7NEJBQWNBLGVBQVlBOzRCQUFjQSxlQUFZQTs0QkFBY0EsZUFBWUE7NEJBQWNBLGVBQVlBOzRCQUFjQSxlQUFZQTs0QkFBaUJBLGVBQVlBOzRCQUFpQkEsZUFBWUE7NEJBQWlCQSxlQUFZQTs0QkFBZ0JBLGVBQVlBOzRCQUFnQkEsZUFBWUE7NEJBQWdCQSxlQUFZQTs0QkFBZ0JBLGVBQVlBOzRCQUFnQkEsZUFBWUE7NEJBQW9CQSxlQUFZQTs0QkFBb0JBLGVBQVlBOzRCQUFvQkEsZUFBWUE7NEJBQW9CQSxlQUFZQTs0QkFBb0JBLGVBQVlBOzRCQUFvQkEsT0FBT0E7MEJBQXR4QkEsS0FBSUE7d0NBWnhEQTswQ0FDRUE7MENBRUFBO3NDQUFKQTt1Q0FDQ0E7cUNBSkZBO3FDQUNBQTt5Q0FFSUE7MENBQ0NBOzBDQUVBQTs2Q0FFT0EsQUFBaURBLFVBQUNBOzRCQUFPQTs0QkFBYUE7NEJBQWFBOzRCQUFhQSxPQUFPQTswQkFBekVBLEtBQUlBOzBDQUNyQ0EsQUFBaURBLFVBQUNBOzRCQUFPQTs0QkFBY0E7NEJBQWNBOzRCQUFjQTs0QkFBY0E7NEJBQWNBLE9BQU9BOzBCQUF4R0EsS0FBSUE7MkNBUHJDQTs7OztrQ0FZbEJBLGFBQWlCQSxZQUFnQkE7b0JBRXREQSxPQUFPQSwyQkFBS0EsYUFBb0JBLFNBQVNBOzs7Ozs7Ozs7Ozs7Ozs4Q0FVUEEsU0FB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QSxZQUFZQTsyQkFFakRBLElBQUlBLHNCQUFxQkE7d0JBRTFCQSxPQUFPQSxrREFBZ0NBLFlBQVlBOzJCQUVsREEsSUFBSUE7d0JBRUxBLE9BQU9BLCtDQUE2QkEsWUFBWUE7MkJBRS9DQSxJQUFJQTt3QkFFTEEsT0FBT0EsK0NBQTZCQSxZQUFZQTsyQkFFL0NBLElBQUlBLHNCQUFxQkEsc0JBQXFCQSxzQkFBcUJBLHNCQUNqRUEsc0JBQXFCQSxzQkFBcUJBLHNCQUFxQkE7d0JBRWxFQSxVQUEyQkEsQUFBeURBLFVBQUNBO2dDQUFPQTtnQ0FBWUE7Z0NBQVlBO2dDQUFZQTtnQ0FBWUE7Z0NBQVlBO2dDQUFZQTtnQ0FBWUE7Z0NBQVlBLE9BQU9BOzhCQUExSUEsS0FBSUE7d0JBQzdEQSxPQUFPQSwrQ0FBNkJBLFNBQVNBLFFBQUlBLGFBQWFBOzJCQUU3REEsSUFBSUEsc0JBQXFCQSxzQkFBcUJBLHNCQUFxQkEsc0JBQ2pFQSxzQkFBcUJBLHNCQUFxQkEsc0JBQXFCQTt3QkFFbEVBLFdBQTJCQSxBQUF5REEsVUFBQ0E7Z0NBQU9BO2dDQUFZQTtnQ0FBWUE7Z0NBQVlBO2dDQUFZQTtnQ0FBWUE7Z0NBQVlBO2dDQUFZQTtnQ0FBWUEsT0FBT0E7OEJBQTFJQSxLQUFJQTt3QkFDN0RBLE9BQU9BLHVEQUFxQ0EsU0FBU0EsU0FBSUEsYUFBYUE7OztvQkFHMUVBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cclxubmFtZXNwYWNlIExvdHRlcnlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBwYXJ0aWFsIGNsYXNzIEJldEhlbHBlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nW10gQ29udGVudERhWGlhbyA9IG5ldyBzdHJpbmdbMl0geyBcIuWkp1wiLCBcIuWwj1wiIH07XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmdbXSBDb250ZW50RGFuU2h1YW5nID0gbmV3IHN0cmluZ1syXSB7IFwi5Y2VXCIsIFwi5Y+MXCIgfTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIENvbnRlbnREYVhpYW9EYW5TaHVhbmcgPSBuZXcgc3RyaW5nWzRdIHsgXCLlpKdcIiwgXCLlsI9cIiwgXCLljZVcIiwgXCLlj4xcIiB9O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nW10gQ29udGVudE1hcmtTaXg0OSA9IG5ldyBzdHJpbmdbNDldIHsgXCIwMVwiLFwiMDJcIixcIjAzXCIsXCIwNFwiLFwiMDVcIixcIjA2XCIsXCIwN1wiLFwiMDhcIixcIjA5XCIsXCIxMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMTFcIixcIjEyXCIsXCIxM1wiLFwiMTRcIixcIjE1XCIsXCIxNlwiLCBcIjE3XCIsXCIxOFwiLFwiMTlcIixcIjIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIyMVwiLFwiMjJcIixcIjIzXCIsXCIyNFwiLFwiMjVcIixcIjI2XCIsXCIyN1wiLFwiMjhcIixcIjI5XCIsXCIzMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMzFcIixcIjMyXCIsXCIzM1wiLFwiMzRcIixcIjM1XCIsXCIzNlwiLFwiMzdcIixcIjM4XCIsXCIzOVwiLFwiNDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjQxXCIsXCI0MlwiLFwiNDNcIixcIjQ0XCIsXCI0NVwiLFwiNDZcIixcIjQ3XCIsXCI0OFwiLFwiNDlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZ1tdIENvbnRlbnRQY0RhbkRhbjEwID0gbmV3IHN0cmluZ1sxMF0geyBcIjFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiLCBcIjBcIiB9O1xyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRGljdGlvbmFyeTxpbnQsIEZ1bmM8c3RyaW5nLCBpbnQsIGludD4+IE51bXMgPSBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgRGljdGlvbmFyeTxpbnQsIEZ1bmM8c3RyaW5nLCBpbnQsIGludD4+KCksKF9vMSk9PntfbzFbMTAwMDBdPSBHZXRTaGlTaGlDYWlOdW0oKTtfbzFbMTAwMDFdPSBHZXRTaGlTaGlDYWlOdW0oKTtfbzFbMTAwMDJdPSBHZXRTaGlTaGlDYWlOdW0oKTtfbzFbMTAwMDNdPSBHZXRTaGlTaGlDYWlOdW0oKTtfbzFbMTAwMDRdPSBHZXRTaGlTaGlDYWlOdW0oKTtfbzFbMTAwMDVdPSBHZXRTaGlTaGlDYWlOdW0oKTtfbzFbMjAwMDBdPSBHZXRQa1NoaU51bSgpO19vMVsyMDAwMV09IEdldFBrU2hpTnVtKCk7X28xWzIwMDAyXT0gR2V0UGtTaGlOdW0oKTtfbzFbMjAwMDNdPSBHZXRQa1NoaU51bSgpO19vMVsyMDAwNF09IEdldFBrU2hpTnVtKCk7X28xWzMwMDAwXT0gR2V0RGlQaW5DYWlOdW0oKTtfbzFbMzAwMDFdPSBHZXREaVBpbkNhaU51bSgpO19vMVszMDAwMl09IEdldERpUGluQ2FpTnVtKCk7X28xWzQwMDAwXT0gR2V0S3VhaVNhbk51bSgpO19vMVs0MDAwMV09IEdldEt1YWlTYW5OdW0oKTtfbzFbNDAwMDJdPSBHZXRLdWFpU2FuTnVtKCk7X28xWzQwMDAzXT0gR2V0S3VhaVNhbk51bSgpO19vMVs0MDAwNF09IEdldEt1YWlTYW5OdW0oKTtfbzFbNjAwMDBdPSBHZXRTaGlZaVh1YW5XdU51bSgpO19vMVs2MDAwMV09IEdldFNoaVlpWHVhbld1TnVtKCk7X28xWzYwMDAyXT0gR2V0U2hpWWlYdWFuV3VOdW0oKTtfbzFbNjAwMDNdPSBHZXRTaGlZaVh1YW5XdU51bSgpO19vMVs2MDAwNF09IEdldFNoaVlpWHVhbld1TnVtKCk7X28xWzYwMDA1XT0gR2V0U2hpWWlYdWFuV3VOdW0oKTtyZXR1cm4gX28xO30pO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXROdW0oaW50IGxvdHRlcnlDb2RlLCBpbnQgbWV0aG9kQ29kZSwgc3RyaW5nIGNvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTnVtc1tsb3R0ZXJ5Q29kZV0uSW52b2tlKGNvbnRlbnQsIG1ldGhvZENvZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI3JlZ2lvbiDlrprkvY3vvIzlpI3lvI/nu4TlkIhcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyDojrflj5blrprkvY3og4ZcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNvbnRlbnRcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IEdldERpbmdXZWlEYW5Db3VudChzdHJpbmcgY29udGVudCwgc3RyaW5nW10gY2hlY2tDb250ZW50LCBpbnQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgTGlzdDxzdHJpbmc+IGNfU3BsaXQgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPHN0cmluZz4oY29udGVudC5TcGxpdCgnfCcpLChnbG9iYWw6OlN5c3RlbS5GdW5jPHN0cmluZywgYm9vbD4pKGl0ZW0gPT4gIXN0cmluZy5Jc051bGxPckVtcHR5KGl0ZW0pKSkuVG9MaXN0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY19TcGxpdC5Db3VudCAhPSBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY291bnQ7XHJcblxyXG4gICAgICAgICAgICBjX1NwbGl0LkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxzdHJpbmc+KShlYWNoID0+IHsgY291bnQgKz0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxzdHJpbmc+KGVhY2guU3BsaXQoJywnKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxzdHJpbmcsIGJvb2w+KShpdGVtID0+ICFzdHJpbmcuSXNOdWxsT3JFbXB0eShpdGVtKSAmJiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY2hlY2tDb250ZW50LGl0ZW0pICYmIGl0ZW0gIT0gXCJfXCIpKS5Db3VudCgpOyB9KSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIOiOt+WPluWkjeW8j+e7hOWQiO+8jOavj+S4gOmhueS4jemHjeWkjVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgR2V0RnVTaGlSb3dHcm91cERpZmZlcmVudENvdW50KHN0cmluZyBjb250ZW50LCBpbnQgbWF4LCBzdHJpbmdbXSBjaGVja0NvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoY29udGVudCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdbXSBiZXRzID0gY29udGVudC5TcGxpdCgnfCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJldHMuTGVuZ3RoICE9IG1heClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMaXN0PExpc3Q8c3RyaW5nPj4gbGlzdCA9IG5ldyBMaXN0PExpc3Q8c3RyaW5nPj4obWF4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF4ID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnQgY2hhID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBtYXg7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGlzdDxzdHJpbmc+IGlfbGlzdCA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8c3RyaW5nPihiZXRzW2ldLlNwbGl0KCcsJyksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBib29sPikoaXRlbSA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY2hlY2tDb250ZW50LGl0ZW0pKSkuRGlzdGluY3QoKS5Ub0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuQWRkKGlfbGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGEgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkludGVyc2VjdDxzdHJpbmc+KGxpc3RbaSAtIDFdLGlfbGlzdCkuQ291bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENhcnRlc2lhblByb2R1Y3RDb3VudDxzdHJpbmc+KGxpc3QpIC0gY2hhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG1heDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMaXN0PHN0cmluZz4gaV9saXN0ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxzdHJpbmc+KGJldHNbaV0uU3BsaXQoJywnKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxzdHJpbmcsIGJvb2w+KShpdGVtID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjaGVja0NvbnRlbnQsaXRlbSkpKS5EaXN0aW5jdCgpLlRvTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5BZGQoaV9saXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PHN0cmluZz4+KENhcnRlc2lhblByb2R1Y3Q8c3RyaW5nPihsaXN0KSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8c3RyaW5nPiwgYm9vbD4pKGl0ZW0gPT4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Hcm91cEJ5PHN0cmluZyxzdHJpbmc+KGl0ZW0sKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBzdHJpbmc+KShnID0+IGcpKS5Db3VudCgpID09IG1heCkpLkNvdW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIOiOt+WPluWkmuihjO+8jOaAu+mhueS4jeWPr+mHjeWkje+8jOavj+S4gOmhueS4jemHjeWkjeeahOWNleW8j+azqOaVsFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXREYW5TaGlSb3dHcm91cERpZmZlcmVudENvdW50KHN0cmluZyBjb250ZW50LCBpbnQgbWF4LCBzdHJpbmdbXSBjaGVja0NvbnRlbnQsIGNoYXIgc3BsaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmdbXSBjb250ZW50cyA9IGNvbnRlbnQuU3BsaXQoJywnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkRpc3RpbmN0PHN0cmluZz4oY29udGVudHMpLkNvdW50KChnbG9iYWw6OlN5c3RlbS5GdW5jPHN0cmluZywgYm9vbD4pKGl0ZW0gPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8c3RyaW5nPihpdGVtLlRyaW0oKS5TcGxpdChzcGxpdCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBib29sPikodyA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY2hlY2tDb250ZW50LHcpKSkuR3JvdXBCeTxzdHJpbmc+KChnbG9iYWw6OlN5c3RlbS5GdW5jPHN0cmluZywgc3RyaW5nPikoZyA9PiBnKSkuQ291bnQoKSA9PSBtYXg7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8g6I635Y+W5aSa6KGM77yM5oC76aG55LiN5Y+v6YeN5aSN77yM5q+P5LiA6aG55o6S5bqP5ZCO5LiN6YeN5aSN55qE5Y2V5byP5rOo5pWwXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEdldERhblNoaVJvd0dyb3VwT3JkZXJEaWZmZXJlbnRDb3VudChzdHJpbmcgY29udGVudCwgaW50IG1heCwgc3RyaW5nW10gY2hlY2tDb250ZW50LCBjaGFyIHNwbGl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nW10gY29udGVudHMgPSBjb250ZW50LlNwbGl0KCcsJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3Q8c3RyaW5nLHN0cmluZz4oY29udGVudHMsKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBzdHJpbmc+KShpdGVtID0+IHN0cmluZy5Kb2luKHNwbGl0LlRvU3RyaW5nKCksIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuT3JkZXJCeTxzdHJpbmcsc3RyaW5nPihpdGVtLlRyaW0oKS5TcGxpdChzcGxpdCksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBzdHJpbmc+KShvID0+IG8pKSkpKS5EaXN0aW5jdCgpLkNvdW50KChnbG9iYWw6OlN5c3RlbS5GdW5jPHN0cmluZywgYm9vbD4pKGl0ZW0gPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8c3RyaW5nPihpdGVtLlNwbGl0KHNwbGl0KSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxzdHJpbmcsIGJvb2w+KSh3ID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjaGVja0NvbnRlbnQsdykpKS5Hcm91cEJ5PHN0cmluZz4oKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBzdHJpbmc+KShnID0+IGcpKS5Db3VudCgpID09IG1heDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyDojrflj5bvvIzmgLvpobnkuI3lj6/ph43lpI3vvIzmr4/kuIDpobnlj6/ph43lpI3nmoTljZXlvI/ms6jmlbAgICBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNvbnRlbnRcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1heFwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2hlY2tDb250ZW50XCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW50IEdldERhblNoaUNvdW50KHN0cmluZyBjb250ZW50LCBpbnQgbWF4LCBzdHJpbmdbXSBjaGVja0NvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5EaXN0aW5jdDxzdHJpbmc+KGNvbnRlbnQuU3BsaXQoJywnKSkuQ291bnQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBib29sPikoaXRlbSA9PiBpdGVtLkxlbmd0aCA9PSBtYXggJiYgU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db3VudDxjaGFyPihpdGVtLChnbG9iYWw6OlN5c3RlbS5GdW5jPGNoYXIsIGJvb2w+KShjID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjaGVja0NvbnRlbnQsYy5Ub1N0cmluZygpKSkpID09IG1heCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyDojrflj5blrZfnrKbkuLLkuI3ph43lpI3kuIDooYzmlbDmja7nmoTnu4TlkIhcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0T25lU3RyaW5nQ29tYmluYXRpb25Db3VudChzdHJpbmcgY29udGVudCwgaW50IG1heCwgc3RyaW5nW10gY2hlY2tDb250ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG1heCA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxzdHJpbmc+KGNvbnRlbnQuU3BsaXQoJywnKSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxzdHJpbmcsIGJvb2w+KShpdGVtID0+IFN5c3RlbS5BcnJheUV4dGVuc2lvbnMuQ29udGFpbnM8c3RyaW5nPihjaGVja0NvbnRlbnQsaXRlbSkpKS5EaXN0aW5jdCgpLkNvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR2V0Q29tYmluYXRpb25Db3VudDxzdHJpbmc+KFN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8c3RyaW5nPihjb250ZW50LlNwbGl0KCcsJyksKGdsb2JhbDo6U3lzdGVtLkZ1bmM8c3RyaW5nLCBib29sPikoaXRlbSA9PiBTeXN0ZW0uQXJyYXlFeHRlbnNpb25zLkNvbnRhaW5zPHN0cmluZz4oY2hlY2tDb250ZW50LGl0ZW0pKSkuRGlzdGluY3QoKS5Ub0FycmF5KCksIG1heCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgI3JlZ2lvbiDmjpLliJfnrpfms5VcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyDnrJvljaHlsJTkuZjnp69cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBMaXN0PExpc3Q8VD4+IENhcnRlc2lhblByb2R1Y3Q8VD4odGhpcyBMaXN0PExpc3Q8VD4+IGxzdFNwbGl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGNvdW50ID0gMTtcclxuICAgICAgICAgICAgbHN0U3BsaXQuRm9yRWFjaCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuTGlzdDxUPj4pKGl0ZW0gPT4gY291bnQgKj0gaXRlbS5Db3VudCkpO1xyXG4gICAgICAgICAgICAvL2NvdW50ID0gbHN0U3BsaXQuQWdncmVnYXRlKDEsIChyZXN1bHQsIG5leHQpID0+IHJlc3VsdCAqIG5leHQuQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxzdFJlc3VsdCA9IG5ldyBMaXN0PExpc3Q8VD4+KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBsc3RUZW1wID0gbmV3IExpc3Q8VD4oKTtcclxuICAgICAgICAgICAgICAgIGludCBqID0gMTtcclxuICAgICAgICAgICAgICAgIGxzdFNwbGl0LkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8VD4+KShpdGVtID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaiAqPSBpdGVtLkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGxzdFRlbXAuQWRkKGl0ZW1bKGkgLyAoY291bnQgLyBqKSkgJSBpdGVtLkNvdW50XSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICBsc3RSZXN1bHQuQWRkKGxzdFRlbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsc3RSZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIOesm+WNoeWwlFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBDYXJ0ZXNpYW5Qcm9kdWN0Q291bnQ8VD4odGhpcyBMaXN0PExpc3Q8VD4+IGxzdFNwbGl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGNvdW50ID0gMTtcclxuXHJcbiAgICAgICAgICAgIGNvdW50ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5BZ2dyZWdhdGU8Z2xvYmFsOjpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYy5MaXN0PFQ+LGludD4obHN0U3BsaXQsMSwgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8aW50LCBnbG9iYWw6OlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkxpc3Q8VD4sIGludD4pKChyZXN1bHQsIG5leHQpID0+IHJlc3VsdCAqIG5leHQuQ291bnQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyDpgJLlvZLnrpfms5XmsYLmlbDnu4TnmoTnu4TlkIgo56eB5pyJ5oiQ5ZGYKVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibGlzdFwiPui/lOWbnueahOiMg+WeizwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidFwiPuaJgOaxguaVsOe7hDwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiblwiPui+heWKqeWPmOmHjzwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibVwiPui+heWKqeWPmOmHjzwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYlwiPui+heWKqeaVsOe7hDwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiTVwiPui+heWKqeWPmOmHj008L3BhcmFtPlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgR2V0Q29tYmluYXRpb248VD4ocmVmIExpc3Q8VFtdPiBsaXN0LCBUW10gdCwgaW50IG4sIGludCBtLCBpbnRbXSBiLCBpbnQgTSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBuOyBpID49IG07IGktLSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYlttIC0gMV0gPSBpIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChtID4gMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHZXRDb21iaW5hdGlvbjxUPihyZWYgbGlzdCwgdCwgaSAtIDEsIG0gLSAxLCBiLCBNKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IG5ldyBMaXN0PFRbXT4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgVFtdIHRlbXAgPSBuZXcgVFtNXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IGIuTGVuZ3RoOyBqKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wW2pdID0gdFtiW2pdXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5BZGQodGVtcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyDmsYLmlbDnu4TkuK1u5Liq5YWD57Sg55qE57uE5ZCIXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0XCI+5omA5rGC5pWw57uEPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJuXCI+5YWD57Sg5Liq5pWwPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+5pWw57uE5LitbuS4quWFg+e0oOeahOe7hOWQiOeahOiMg+WeizwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIExpc3Q8VFtdPiBHZXRDb21iaW5hdGlvbjxUPihUW10gdCwgaW50IG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodC5MZW5ndGggPCBuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnRbXSB0ZW1wID0gbmV3IGludFtuXTtcclxuICAgICAgICAgICAgTGlzdDxUW10+IGxpc3QgPSBuZXcgTGlzdDxUW10+KCk7XHJcbiAgICAgICAgICAgIEdldENvbWJpbmF0aW9uPFQ+KHJlZiBsaXN0LCB0LCB0Lkxlbmd0aCwgbiwgdGVtcCwgbik7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0Q29tYmluYXRpb25Db3VudDxUPihUW10gdCwgaW50IG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodC5MZW5ndGggPCBuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnRbXSB0ZW1wID0gbmV3IGludFtuXTtcclxuICAgICAgICAgICAgTGlzdDxUW10+IGxpc3QgPSBuZXcgTGlzdDxUW10+KCk7XHJcbiAgICAgICAgICAgIEdldENvbWJpbmF0aW9uPFQ+KHJlZiBsaXN0LCB0LCB0Lkxlbmd0aCwgbiwgdGVtcCwgbik7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0LkNvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnQgR2V0Q29tYmluYXRpb25Db3VudDxUPihMaXN0PFQ+IGxpc3QxLCBMaXN0PFQ+IGxpc3QyLCBpbnQgc2l6ZTEsIGludCBzaXplMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIExpc3Q8VD4gb3V0TG9vcDtcclxuICAgICAgICAgICAgTGlzdDxUPiBpbkxvb3A7XHJcblxyXG4gICAgICAgICAgICBpbnQgc2l6ZTtcclxuICAgICAgICAgICAgaWYgKHNpemUxIDwgc2l6ZTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG91dExvb3AgPSBsaXN0MTtcclxuICAgICAgICAgICAgICAgIGluTG9vcCA9IGxpc3QyO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHNpemUyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW5Mb29wID0gbGlzdDE7XHJcbiAgICAgICAgICAgICAgICBvdXRMb29wID0gbGlzdDI7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gc2l6ZTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgb3V0TG9vcC5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVwZWF0ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpbkxvb3AuQ29udGFpbnMob3V0TG9vcFtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwZWF0ID0gMTtcclxuICAgICAgICAgICAgICAgIHZhciBzZXRzaXplID0gaW5Mb29wLkNvdW50IC0gcmVwZWF0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHNldHNpemUgPj0gc2l6ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSAoaW50KUNvbWJpbmF0aW9uQ3Ioc2V0c2l6ZSwgc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbG9uZyBDb21iaW5hdGlvbkNyKGludCBuLCBpbnQgcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG5haXZlOiByZXR1cm4gRmFjdG9yaWFsKG4pIC8gKEZhY3RvcmlhbChyKSAqIEZhY3RvcmlhbChuIC0gcikpO1xyXG4gICAgICAgICAgICByZXR1cm4gQ29tYmluYXRpb25QcihuLCByKSAvIEZhY3RvcmlhbChyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbG9uZyBDb21iaW5hdGlvblByKGludCBuLCBpbnQgcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG5haXZlOiByZXR1cm4gRmFjdG9yaWFsKG4pIC8gRmFjdG9yaWFsKG4gLSByKTtcclxuICAgICAgICAgICAgcmV0dXJuIEZhY3RvcmlhbERpdmlzaW9uKG4sIG4gLSByKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGxvbmcgRmFjdG9yaWFsRGl2aXNpb24oaW50IHRvcEZhY3RvcmlhbCwgaW50IGRpdmlzb3JGYWN0b3JpYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsb25nIHJlc3VsdCA9IDE7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSB0b3BGYWN0b3JpYWw7IGkgPiBkaXZpc29yRmFjdG9yaWFsOyBpLS0pXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKj0gaTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGxvbmcgRmFjdG9yaWFsKGludCBpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGkgPD0gMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICByZXR1cm4gaSAqIEZhY3RvcmlhbChpIC0gMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uXHJcblxyXG4gICAgfVxyXG59XHJcbiJdCn0K
