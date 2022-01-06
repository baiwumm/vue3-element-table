// 表格模拟数据
export const tableData = [
    {
        id: '1',
        name: '李白',
        address: '唐朝',
        province: '广西',
        area: '龙华',
        county: '华强北'
    },
    {
        id: '2',
        name: '曹操',
        province: '广东',
        area: '南山',
        county: '华强北'
    }
]

// 表格列配置
export const columns = [
    // 自定义索引
    {
        label: '排名',
        type: 'index',
        width: 80,
        index: (index: number) => {
            return index * 3
        }
    },
    {
        prop: 'name',
        label: '名字'
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