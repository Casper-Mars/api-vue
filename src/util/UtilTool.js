export default {


    formatJson: function (data) {
        return JSON.stringify(data, null, 4)
    },

    /**
     *获取id
     */
    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    getCurrentInterface(data, id) {
        let tmp = data.data;
        tmp.id = id;
        if (tmp.param != null) {
            let paramList = tmp.param.tableData;
            if (!(paramList === undefined || paramList == null)) {
                this.deal(paramList);
                tmp.param.jsonData = this.getJsonData(paramList);
            }

        }
        if (tmp.resp != null) {
            let respList = tmp.resp.tableData;
            if (!(respList === undefined || respList == null)) {
                this.deal(respList);
                tmp.resp.tableData = respList[0].children;
                tmp.resp.jsonData = this.getJsonData(respList)[''];
            }
        }
        return tmp
    },
    getJsonData: function (paramList) {
        let obj = {};
        if (paramList == null || paramList.length === 0) {
            return null;
        }
        for (let i = 0; i < paramList.length; i++) {
            let param = paramList[i];
            let child = null;
            if (param.children != null) {
                child = this.getJsonData(param.children);
            }
            if (param.array) {
                if (child != null) {
                    obj[param.name] = [child];
                } else {
                    obj[param.name] = [];
                }
            } else {
                if (child != null) {
                    obj[param.name] = child;
                } else {
                    obj[param.name] = '';
                }
            }
        }
        return obj;
    },
    deal: function (list) {
        for (let i = 0; i < list.length; i++) {
            let param = list[i];
            param.id = this.guid();
            param.require = param.require ? "必传" : "否";
            let child = param.children;
            if (child === undefined || child == null || child.length === 0) {
                continue;
            }
            this.deal(child);
        }
    },
    dealMenu: function (menu) {
        menu.index = "/interface/" + menu.interfaceId + menu.hash;
        let children = menu.children;
        if (children === undefined || children == null || children.length === 0) {
            return;
        }
        for (let i = 0; i < children.length; i++) {
            this.dealMenu(children[i]);
        }
    },
}
