import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Space, Typography, DatePicker, Radio, Select, Checkbox, Divider, Spin } from 'antd';
import { useState, useEffect } from 'react';
import './Pages.css';
import { json } from 'react-router-dom';

function NewMatchPage() {

    const [form] = Form.useForm();
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
    
        // Cachear los datos en el almacenamiento local en cada cambio
        const jsonString = JSON.stringify(form.getFieldsValue(), null, 2);
        localStorage.setItem('cachedFormData', jsonString);

        // console.log(`Escribiendo datos ${jsonString}`);
    };

    const onFinish = async () => {
        try {
          setLoading(true);
    
          // Simular una espera antes de la descarga
          await new Promise((resolve) => setTimeout(resolve, 1000));
    
          // values contiene los datos del formulario
          const jsonData = JSON.stringify(form.getFieldsValue(), null, 2);
    
          // Crear un Blob con el contenido JSON
          const blob = new Blob([jsonData], { type: 'application/json' });
    
          // Crear un objeto URL para el Blob
          const url = window.URL.createObjectURL(blob);
    
          // Crear un enlace <a> y simular un clic para iniciar la descarga
          const a = document.createElement('a');
          a.href = url;
          
          a.download = form.getFieldValue('team') + '_' + form.getFieldValue('date').format("DD/MM/YYYY") + '.json'
          a.click();
    
          // Liberar el objeto URL
          window.URL.revokeObjectURL(url);
        } finally {
          setLoading(false);
        }
    };

    return (
        <div>
            <h1>Nuevo partido</h1>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                form={form}
                name="dynamic_form_complex"
                style={{
                    maxWidth: 600,
                    padding: '5%'
                }}
                autoComplete="off"
                onFinish={onFinish}
            >
                <Form.Item label="Equipo rival" name="team">
                    <Select className='teams' onChange={handleInputChange}>
                        <Select.Option value="algemesi">Nou Algemesí CD</Select.Option>
                        <Select.Option value="cvaltamira">CV Altamira</Select.Option>
                        <Select.Option value="alzira">Nou Volei Alzira</Select.Option>
                        <Select.Option value="bluvolley">Blu Volley Godella</Select.Option>
                        <Select.Option value="eliana">CV Camp de Turia L'Eliana</Select.Option>
                        <Select.Option value="cvcatarroja">CV Catarroja</Select.Option>
                        <Select.Option value="pedcheste">PED Cheste</Select.Option>
                        <Select.Option value="cvcid">CV Cid Campeador</Select.Option>
                        <Select.Option value="escuela2lacanyada">Escuela 2 - La Canyada</Select.Option>
                        <Select.Option value="cvontinyent">CV Ontinyent</Select.Option>
                        <Select.Option value="cvpicassent">CV Picassent</Select.Option>
                        <Select.Option value="silla">CD Nuevo Silla</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Lugar"
                    name="place"
                >
                    <Radio.Group onChange={handleInputChange}>
                        <Radio value="local"> Local </Radio>
                        <Radio value="visitante"> Visitante </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Fecha"
                    name="date"
                    style={{alignItems:'baseline'}}
                >
                    <DatePicker onChange={handleInputChange}></DatePicker>
                </Form.Item>
                <Form.List name="items" initialValue={[0]}>
                    {(fields, { add, remove }) => (
                    <div
                        style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                        }}
                    >
                        {fields.map((field) => (
                        <Card
                            size="small"
                            title={`Set ${field.name + 1}`}
                            key={field.key}
                            style={{alignItems:'flex-start'}}
                            extra={
                            <CloseOutlined
                                onClick={() => {
                                remove(field.name);
                                }}
                            />
                            }
                        >
                            <Form.Item label="Nº Set"
                                name={[field.name, 'number_set']}
                                style={{alignItems:'baseline'}}
                                initialValues={{ radio: counter }}
                            >
                                <Radio.Group onChange={handleInputChange}>
                                    <Radio.Button value="1">1</Radio.Button>
                                    <Radio.Button value="2">2</Radio.Button>
                                    <Radio.Button value="3">3</Radio.Button>
                                    <Radio.Button value="4">4</Radio.Button>
                                    <Radio.Button value="5">5</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            {/* Nest Form.List */}
                            <Form.Item>
                            <Form.List name={[field.name, 'list']}>
                                {(subFields, subOpt) => (
                                <div
                                    style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: 16,
                                    }}
                                >
                                    {subFields.map((subField) => (
                                    <Space key={subField.key}>
                                        <div style={{display: 'flex', flexDirection:'column'}}>
                                            <div style={{display: 'flex', flexDirection:'row'}}>
                                                <div style={{ flex:7 }}>
                                                    <div className="points-items">
                                                        <Form.Item label="Punto"
                                                            name={[subField.name, 'point']}
                                                            style={{width:'40%'}}
                                                        >
                                                            <Select onChange={handleInputChange}>
                                                                <Select.Option value="success">Acierto</Select.Option>
                                                                <Select.Option value="failure">Fallo</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item label="Causa"
                                                            name={[subField.name, 'cause']}
                                                            style={{width:'60%'}}
                                                        >
                                                            <Select onChange={handleInputChange}>
                                                                <Select.Option value="A+">Punto ataque</Select.Option>
                                                                <Select.Option value="A-">Fallo ataque</Select.Option>
                                                                <Select.Option value="B+">Punto bloqueo</Select.Option>
                                                                <Select.Option value="B-">Fallo bloqueo</Select.Option>
                                                                <Select.Option value="S+">Punto saque</Select.Option>
                                                                <Select.Option value="S-">Fallo saque</Select.Option>
                                                                <Select.Option value="R-">Fallo recepcion</Select.Option>
                                                                <Select.Option value="D-">Fallo defensa</Select.Option>
                                                                <Select.Option value="T-">Falta técnica</Select.Option>
                                                                <Select.Option value="F-">Falta táctica</Select.Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </div>
                                                    <div style={{display:'flex', alignItems:'flex-end'}}>
                                                        <Form.Item label="Jugadora"
                                                            name={[subField.name, 'player']}
                                                            style={{flexGrow:1}}
                                                        >
                                                            <Select onChange={handleInputChange}>
                                                                <Select.Option value="4">4 - Elena</Select.Option>
                                                                <Select.Option value="6">6 - Mar</Select.Option>
                                                                <Select.Option value="8">8 - Bea</Select.Option>
                                                                <Select.Option value="9">9 - Miriam</Select.Option>
                                                                <Select.Option value="18">18 - Begoña</Select.Option>
                                                                <Select.Option value="20">20 - Laura</Select.Option>
                                                                <Select.Option value="21">21 - Sara</Select.Option>
                                                                <Select.Option value="22">22 - Nuria</Select.Option>
                                                                <Select.Option value="25">25 - Carla</Select.Option>                                         
                                                            </Select>
                                                        </Form.Item>                                            
                                                        <Form.Item
                                                            name={[subField.name, 'given_point_by_rival']}
                                                            valuePropName="checked"
                                                            initialValue={false}
                                                            wrapperCol={{
                                                                offset: 8,
                                                                span: 16,
                                                            }}
                                                            >
                                                            <Checkbox onChange={handleInputChange}>#</Checkbox>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <CloseOutlined
                                                className="cross-button"
                                                onClick={() => {
                                                    subOpt.remove(subField.name);
                                                    setCounter(counter - 1);
                                                }}
                                                />
                                            </div>
                                            <Divider />
                                        </div>
                                    </Space>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={() => subOpt.add()}
                                        block
                                        style={{flexGrow:1}}
                                    >
                                    + Añadir punto
                                    </Button>
                                </div>
                                )}
                            </Form.List>
                            </Form.Item>
                        </Card>
                        ))}

                        <Button type="dashed" onClick={() => {add(); setCounter(counter + 1);}} block>
                        + Añadir set
                        </Button>
                    </div>
                    )}
                </Form.List>

                <Form.Item style={{marginTop: '20px'}}>
                    <Button type="primary" htmlType="submit">
                    Finalizar
                    </Button>
                </Form.Item>

                {/* Mostrar el spinner mientras se está procesando la descarga */}
                <Spin spinning={loading} tip="Procesando...">
                    <div style={{ height: '100px' }} />
                </Spin>
                {
                    /**
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                        )}
                    </Form.Item>
                    */
                }                                
            </Form>
        </div>
    );

}

export default NewMatchPage;