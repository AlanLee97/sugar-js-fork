# sugar-js

This is a library that provides responsive capabilities

## Install

npm install sugar-reactive-js

## Use

        <div id="app">
            <div id="app">
                <div>
                    {{title.value}}
                </div>
            
                <div s-for="(item,index) in state.list" s-if="(item.d + state.num) > 1">
                    {{item.d + state.num}}
                </div>
            
                <button @click="update">+1</button>
            </div>
        </div>
    
        <script>
        
            var sugar = makeSugar({
                bulk() {
        
                    const state = reactive({
                        num: 0,
                        list: [{d: 1}, {d: 2}, {d: 3}],
                        classText: 'font-size:17px',
                        fontSize: 15,
                        choose: 1,
                        selectList: [{
                            label: "选项一",
                            value: 1
                        }, {
                            label: "选项二",
                            value: 2
                        }]
                    })
        
                    const title = reckon(() => {
                        return state.num + '计算属性测试'
                    })
        
                    const styleText = reckon(() => {
                        return `font-size:${state.fontSize}px`;
                    })
        
                    onMounted(() => {
        
                        state.num += 1;
                        state.classText = "font-size:13px"
        
                    })
        
                    function update() {
                        state.num += 1
                    }
        
                    function changeNum(e) {
                        state.num = e.target.value
                    }
        
                    function changeChoose(e) {
                        state.choose = e
                    }
        
                    const testRef = ref("testRef");
        
                    return {
                        state,
                        update,
                        title,
                        styleText,
                        changeNum,
                        changeChoose,
                        testRef
                    }
                }
            })
        
            sugar.mount('#app')
        
        
        </script>
