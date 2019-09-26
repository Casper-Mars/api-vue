<template>
    <div>
        <h2>
            流程测试
        </h2>
        <div class="devi_line">分界线</div>
        <div>
            <el-button>添加接口</el-button>
        </div>
        <div id="mountNode">
        </div>

        <el-dialog
                title="选择接口"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>选择接口</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    export default {
        name: "SequenceTestView",
        data() {
            return {
                dialogVisible: false,
                rendData: {
                    nodes: [{
                        id: 'node1',
                        x: 100,
                        y: 200,
                        size: 50,
                        label: '登录接口'
                    },{
                        id: 'node2',
                        x: 300,
                        y: 200,
                        size: 50,
                        label: '商品接口'
                    }],
                        edges: [{
                    source: 'node1',
                    target: 'node2'
                }]
                }
            }
        },
        methods: {
          switchMenu () {
              let menu = JSON.parse(localStorage.getItem('menu'))
              console.log(menu);
          }
        },
        mounted(){
            // const graph = new G6.Graph({
            //     container: 'mountNode',
            //     width: 500,
            //     height: 500
            // });
            // graph.data(this.rendData);
            // graph.render();
            //
            // graph.on('node:click', ev => {
            //     this.dialogVisible = true
            //     this.switchMenu()
            //     const shape = ev.target;
            //     const node = ev.item;
            //     console.log(shape)
            //     console.log(node)
            // });

            G6.registerNode('circleNode', {
                drawShape(cfg, group) {
                    const keyShape = group.addShape('circle', {
                        attrs: {
                            x: 0,
                            y: 0,
                            r: 30,
                            fill: '#87e8de'
                        }
                    });
                    return keyShape;
                }
            }, 'circle');

            const graph = new G6.Graph({
                container: 'mountNode',
                width: 1000,
                height: 1000,
                defaultNode: {
                    shape: 'circleNode'
                },
                defaultEdge: {
                    color: '#bae7ff'
                },
                modes: {
                    default: [ 'drag-group', 'drag-node-with-group', 'collapse-expand-group' ]
                }
            });
            const data = {
                nodes: [
                    {
                        id: 'node6',
                        groupId: 'group3',
                        label: 'node6-group3',
                        x: 100,
                        y: 300,
                        shape: 'rect'
                    },
                    {
                        id: 'node1',
                        label: 'node1-group1',
                        groupId: 'group1',
                        x: 100,
                        y: 100
                    },
                    {
                        id: 'node9',
                        label: 'node9-p1',
                        groupId: 'p1',
                        x: 300,
                        y: 210
                    },
                    {
                        id: 'node2',
                        label: 'node2-group2',
                        groupId: 'group1',
                        x: 150,
                        y: 200
                    },
                    {
                        id: 'node3',
                        label: 'node3-group2',
                        groupId: 'group2',
                        x: 300,
                        y: 100
                    },
                    {
                        id: 'node7',
                        groupId: 'p1',
                        label: 'node7-p1',
                        x: 200,
                        y: 200
                    },
                    {
                        id: 'node10',
                        label: 'node10-p2',
                        groupId: 'p2',
                        x: 300,
                        y: 210
                    }
                ],
                edges: [
                    {
                        source: 'node1',
                        target: 'node2'
                    },
                    {
                        source: 'node2',
                        target: 'node3'
                    },
                    {
                        source: 'node1',
                        target: 'node3'
                    },
                    {
                        source: 'node6',
                        target: 'node1'
                    }
                ],
                groups: [
                    {
                        id: 'group1',
                        title: '1',
                        parentId: 'p1'
                    },
                    {
                        id: 'group2',
                        title: '2',
                        parentId: 'p1'
                    },
                    {
                        id: 'group3',
                        title: '2',
                        parentId: 'p2'
                    },
                    {
                        id: 'p1',
                        title: '3'
                    },
                    {
                        id: 'p2',
                        title: '3'
                    }
                ]
            };
            graph.data(data)
            graph.render()

        }
    }
</script>

<style scoped>
    .devi_line{
        padding: 0 20px 0;
        margin: 20px 0;
        line-height: 1px;
        border-left: 200px solid black;
        border-right: 200px solid black;
        text-align: center;
    }
</style>
