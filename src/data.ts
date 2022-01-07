// 表格模拟数据
export const tableData = [
    {
        id: '1',
        name: '李白',
        province: '广东',
        area: '深圳',
        county: '南山'
    },
    {
        id: '2',
        name: '曹操',
        province: '北京',
        area: '朝阳',
        county: '天安门'
    },
    {
        id: '3',
        name: '白居易',
        province: '广东',
        area: '广州',
        county: '天河'
    },
    {
        id: '4',
        name: '秦始皇',
        province: '秦国',
        area: '江南',
        county: '东篱下'
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