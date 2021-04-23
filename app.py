from flask import Flask

from flask import render_template

from flask import jsonify

import utils

app = Flask(__name__)

@app.route('/')

def hello_world():

    return render_template("index.html")

@app.route('/r2')
def get_r2_data():
    u = utils.utils("a04","willingness_to_pay_sorted","root","Tangsoub101",'r2')
    data=u.get_r2_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/r3')
def get_r3_data():
    u = utils.utils("a04", "features_relevance_all", "root", "Tangsoub101", 'r3')
    data=u.get_r3_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})

@app.route('/l3')
def get_l3_data():
    u= utils.utils("a04", "features_relevance_all", "root", "Tangsoub101",'l3')
    data=u.get_l3_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})

@app.route('/r4')
def get_r4_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101", 'map')
    data=u.get_map_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})

@app.route('/5')
def get_5_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'5')
    data=u.get_5_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/l5_1')
def get_l5_data1():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'5')
    data=u.get_l5_data1()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/l5_2')
def get_l5_data2():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'5')
    data=u.get_l5_data2()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/6_y2')
def get_6_y2_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'6_y2')
    data=u.get_6_y2_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/6_y3')
def get_6_y3_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'6_y3')
    data=u.get_6_y3_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/7_1')
def get_7_1_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'7_1')
    data=u.get_7_1_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/7_2')
def get_7_2_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'7_2')
    data=u.get_7_2_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/7_3')
def get_7_3_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'7_3')
    data=u.get_7_3_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/7_4')
def get_7_4_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'7_4')
    data=u.get_7_4_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
@app.route('/l9')
def get_l7_data():
    u = utils.utils("a04", "data_features_selected", "root", "Tangsoub101",'l7')
    data=u.get_l9_data()
    keys = list(data.keys())
    values = list(data.values())
    return jsonify({"keys":keys,"values":values})
if __name__ == '__main__':
    app.run()