STATES = {
    '美国东部': [
        '纽约',
        '上州',
        '宾州',
        '康州',
        '麻州',
        '新泽西',
        '罗得岛',
        '缅因州',
        '佛蒙特',
        '新罕布什尔',
    ],
    '美国南部': [
        '佛州',
        '德州',
        '南卡',
        '北卡',
        '马里兰',
        '乔治亚',
        '田纳西',
        '路易斯安娜',
        '肯塔基',
        '特拉华',
        '密西西比',
        '俄克拉荷马',
        '阿肯色',
        '阿拉巴马',
        '弗吉尼亚',
        '西弗吉尼亚',
    ],
    '美国中部': [
        '伊州',
        '俄亥俄',
        '密苏里',
        '堪萨斯',
        '爱荷华',
        '密歇根',
        '明尼苏达',
        '南达科他',
        '北达科他',
        '印第安纳',
        '威斯康星',
        '内布拉斯加',
    ],
    '美国西部': [
        '犹他',
        '洛杉矶',
        '南加州',
        '夏威夷',
        '内华达',
        '蒙大拿',
        '俄勒冈',
        '爱达荷',
        '怀俄明',
        '科罗拉多',
        '亚利桑那',
        '阿拉斯加',
        '新墨西哥',
        '华盛顿州',
    ],
}


# from django.db import migrations
# from app.states import STATES


# class Migration(migrations.Migration):

#     def init_states(apps, schema_editor):
#         State = apps.get_model('app', 'State')
#         for region, states in STATES.items():
#             for state in states:
#                 s = State(name=state, region=region)
#                 s.save()

#     dependencies = [
#         ('app', '0001_initial'),
#     ]

#     operations = [
#         migrations.RunPython(init_states),
#     ]
