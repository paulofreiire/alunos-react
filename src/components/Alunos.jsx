import React from 'react';
import {Form, Col, Card, Button} from 'react-bootstrap';


function alunos(props) {
    const aluno = props.aluno;
    const campi = props.campus;
    const cursos = props.cursos;

    return <div className="container-md mt-10">
        <h1><b>Sistema de Controle de Alunos</b></h1>
        <Card border="primary">
            <Card.Header>Formulário Aluno</Card.Header>
            <Form onSubmit={props.handleSubmit}>
                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} lg="3" controlId="matricula">
                            <Form.Label>Matrícula</Form.Label>
                            <Form.Control readOnly={props.atualizar} onChange={props.handleChange}
                                          value={aluno.matricula} type="number"
                                          placeholder="Digite a matrícula" name="matricula"
                                          min="100000" max="999999" required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.nome} type="text"
                                          placeholder="Nome Completo" name="nome" minlength="3" required/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} lg="3" controlId="data">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.dateNascimento} type="date"
                                          name="dateNascimento" required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.email} type="text"
                                          placeholder="Email@email.com" name="email" required/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} lg="1" controlId="ddd">
                            <Form.Label>DDD</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.ddd} type="number"
                                          placeholder="85" name="ddd" min="11" max="99" required/>
                        </Form.Group>

                        <Form.Group as={Col} lg="4" controlId="telefone" >
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.telefone} type="number"
                                          placeholder="99999-9999" name="telefone" min="11111111" max="999999999" required/>
                        </Form.Group>

                        <Form.Group as={Col} lg="3" controlId="operadora" required>
                            <Form.Label>Operadora</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.operadora} as="select" defaultValue="Choose..."
                                          name="operadora">
                                <option selected="selected">Escolher Operadora</option>
                                <option value="TIM">TIM</option>
                                <option value="Oi">Oi</option>
                                <option value="Claro">Claro</option>
                                <option value="VIVO">VIVO</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="campus">
                            <Form.Label>Campus</Form.Label>

                            <Form.Control onChange={props.handleChange} value={aluno.campus} as="select"
                                           name="campus" required>
                                <option selected="selected">Escolher Campus</option>
                                {campi.map((campus) => {
                                    return <option value={campus.id}>{campus.nome}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="curso">
                            <Form.Label>Curso</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.curso} as="select"
                                           name="curso" required>
                                <option selected="selected">Escolha um curso</option>
                                {cursos.filter((curso) => {
                                        return curso.campus_id.toString() === aluno.campus.toString()
                                    }).map((curso) => {
                                    return <option value={curso.id}>{curso.nome}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                </Card.Body>
                <Card.Footer className="d-flex flex-row-reverse">
                    <Button variant="primary" type="submit">
                        {props.btnLabel}
                    </Button>
                    <Button variant="secondary" onClick={props.handleClean}>
                        Limpar
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    </div>
}

export default alunos;

