import pymysql
from sqlalchemy import create_engine
import pandas as pd

class utils:
    def __init__(self,db_name,table_name,user,password,chart):
        self.db_name=db_name
        self.table_name=table_name
        self.user=user
        self.password=password
        self.chart=chart
        self.data = self.querry(chart)
    def get_conn(self):
        '''

        :return:连接
        '''
        #创建连接
        conn=pymysql.connect(host="127.0.0.1",port=3306,user=self.user,password=self.password,
                             db=self.db_name,charset="utf8")
        cursor=conn.cursor()
        return conn,cursor

    def close_conn(self,conn,cursor):
        cursor.close()
        conn.close()

    def querry(self,chart):
        conn = create_engine('mysql://{}:{}@127.0.0.1:3306/{}?charset=utf8'.format(self.user,self.password,self.db_name))
        if chart=='r3'or chart=='l3'or chart=='r2':
            sql="SELECT * FROM {}".format(self.table_name)
        elif chart=='map':
            sql="SELECT seg_route_to, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE seg_route_to <> 'NULL' GROUP BY seg_route_to;"
        elif chart=='5':
            sql = "SELECT seg_cabin, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy,SUM(emd_lable2) as emdsum,COUNT(emd_lable2) as emdcount FROM data_features_selected WHERE seg_cabin <> 'NULL' GROUP BY seg_cabin;"
        elif chart=='6_y2':
            sql="SELECT select_seat_cnt_y2, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE select_seat_cnt_y2 <> 'NULL' GROUP BY select_seat_cnt_y2;"
        elif chart=='6_y3':
            sql="SELECT select_seat_cnt_y3, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE select_seat_cnt_y2 <> 'NULL' GROUP BY select_seat_cnt_y3;"
        elif chart=='7_1':
            sql="SELECT pref_line_y3_1, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE pref_line_y3_1 <> '0' GROUP BY pref_line_y3_1 HAVING occupy <> 'Null';"
        elif chart=='7_2':
            sql="SELECT pref_line_y3_2, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE pref_line_y3_2 <> '0' GROUP BY pref_line_y3_2 HAVING occupy <> 'Null';"
        elif chart=='7_3':
            sql="SELECT pref_line_y3_3, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE pref_line_y3_3 <> '0' GROUP BY pref_line_y3_3 HAVING occupy <> 'Null';"
        elif chart=='7_4':
            sql="SELECT pref_line_y3_4, (SUM(emd_lable2))/COUNT(emd_lable2) as occupy FROM data_features_selected WHERE pref_line_y3_4 <> '0' GROUP BY pref_line_y3_4 HAVING occupy <> 'Null';"
        elif chart=='l9':
            sql=""
        dict = pd.read_sql(sql, con=conn)
        return dict

    def get_r2_data(self):
        dict={}
        df=self.data
        df = df.sort_values(by='will', ascending=False)
        for p,v in zip(df.pax_name,df.will):
            dict[p]=v
        return dict
    def get_r3_data(self):
        dict={}
        df=self.data
        df = df.sort_values(by='relevance', ascending=False)
        for p,v in zip(df.feature,df.relevance):
            dict[p]=v
        return dict
    def get_l3_data(self):
        dict={}
        df=self.data
        df = df.sort_values(by='relevance', ascending=False)[:19]
        for p,v in zip(df.feature,df.relevance):
            dict[p]=v
        return dict
    def get_map_data(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='occupy', ascending=False)
        for p, v in zip(df.seg_route_to, df.occupy):
            dict[p] = v
        return dict
    def get_5_data(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='occupy', ascending=False)
        for p, v in zip(df.seg_cabin, df.occupy):
            dict[p] = v
        return dict
    def get_l5_data1(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='occupy', ascending=False)
        for p, v in zip(df.seg_cabin, df.emdsum):
            dict[p] = v
        return dict
    def get_l5_data2(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='occupy', ascending=False)
        for p, v in zip(df.seg_cabin, df.emdcount):
            dict[p] = v
        return dict
    def get_6_y2_data(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='select_seat_cnt_y2', ascending=True)
        for p, v in zip(df.select_seat_cnt_y2, df.occupy):
            dict[p] = v
        return dict
    def get_6_y3_data(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='select_seat_cnt_y3', ascending=True)
        for p, v in zip(df.select_seat_cnt_y3, df.occupy):
            dict[p] = v
        return dict
    def get_7_1_data(self):
        dict = {}
        df = self.data
        for p, v in zip(df.pref_line_y3_1, df.occupy):
            dict[p] = v
        return dict
    def get_7_2_data(self):
        dict = {}
        df = self.data
        for p, v in zip(df.pref_line_y3_2, df.occupy):
            dict[p] = v
        return dict
    def get_7_3_data(self):
        dict = {}
        df = self.data
        for p, v in zip(df.pref_line_y3_3, df.occupy):
            dict[p] = v
        return dict
    def get_7_4_data(self):
        dict = {}
        df = self.data
        for p, v in zip(df.pref_line_y3_4, df.occupy):
            dict[p] = v
        return dict

    def get_l9_data(self):
        dict = {}
        df = self.data
        df = df.sort_values(by='select_seat_cnt_y3', ascending=True)
        for p, v in zip(df.select_seat_cnt_y3, df.occupy):
            dict[p] = v
        return dict


if __name__=="__main__":
    # u=utils("a04","features_relevance_all","root","Tangsoub101",'l3')
    u = utils("a04", "data_features_selected", "root", "Tangsoub101", '7_1')
    # u = utils("a04", "features_relevance_all", "root", "Tangsoub101", 'r3')
    # u = utils("a04", "feature", "root", "Tangsoub101", '6_y3')
    print(list(u.get_7_1_data().keys()))
    print(list(u.get_7_1_data().values()))