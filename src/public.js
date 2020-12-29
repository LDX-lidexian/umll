
import Vue from 'vue'
export default new Vue()


export default {
    data() {
        return {
            defaultProps: {
                label: 'label',
                children: 'children',
            },
            icontype: 'android-apps',
            count: 1,
            treedata: [],
        }
    },
    mounted() {
        this.getDatatree();
    },
    methods: {
        getDatatree() {
            this.params = {
                mgdept: "aircon"
            },
                this.$api.RelationTag.arealistTree(this.params).then(res => {
                    console.log(res.code);
                    if (res.code === 0) {
                        const data = JSON.parse(res.list);
                        this.treedata = data;
                        for (let i = 0; i < this.treedata.length; i++) {
                            this.props.label.push(this.treedata[i].label);
                            this.props.children.push(this.treedata[i].children);
                        }
                    }
                }).catch(error => {
                    //this.$Message.info(error);
                })
        },
    }