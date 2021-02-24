// 递归
function toTreeData(data, pid) {
    function tree(id) {
        let arr = []
        data.filter(item => {
            return item.parentId === id;
        }).forEach(item => {
            if(tree(item.id).length>0){
                item.children = tree(item.id)
            }
            arr.push(item)
        })
        return arr
    }
    return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
}

// 金额格式化
function setMoney(number){
    if(!number && number!==0) return '';
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(number)
}

export {
    toTreeData,
    setMoney
}
