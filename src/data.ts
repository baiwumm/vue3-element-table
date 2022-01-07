
// 表格列配置
export const columns: any = [
    // 自定义索引
    {
        label: '排名',
        prop: 'ranking',
        type: 'index',
        width: 80,
        index: (index: number) => {
            return index * 3
        }
    },
    {
        prop: 'name',
        label: '名字',
        slotName: 'name'
    },
    {
        prop: 'address',
        label: '地址',
        children: [
            {
                label: '省份',
                prop: 'province',
                align: 'center'
            },
            {
                label: '城市',
                prop: 'city',
                align: 'center',
                children: [
                    {
                        label: '区',
                        prop: 'area',
                        align: 'center',
                    },
                    {
                        label: '县',
                        prop: 'county',
                        align: 'center',
                    }
                ]
            }
        ]
    }
]