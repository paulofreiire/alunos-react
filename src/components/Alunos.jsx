import React from 'react';
import {Form, Col, Row, Card, Button} from 'react-bootstrap';

function alunos(props) {
    const aluno = props.aluno;
    return <div className="container-md mt-10">
        <h1><b>Sistema de Controle de Alunos</b></h1>
        <Card border="primary">
            <Card.Header>Formulário Aluno</Card.Header>
            <Form onSubmit={props.handleSubmit}>
                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} lg="3" controlId="matricula">
                            <Form.Label>Matrícula</Form.Label>
                            <Form.Control readOnly={props.atualizar} onChange={props.handleChange} value={aluno.matricula} type="number"
                                          placeholder="Digite a matrícula" name="matricula"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.nome} type="text"
                                          placeholder="Nome Completo" name="nome"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} lg="3" controlId="data">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.dateNascimento} type="date"
                                          placeholder="1234 Main St" name="dateNascimento"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={props.handleChange} value={aluno.email} type="number"
                                          placeholder="Email@email.com" name="email" required/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="campus">
                            <Form.Label>Campus</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Pici</option>
                                <option>Benfica</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="curso">
                            <Form.Label>Curso</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Computação</option>
                                <option>Moda</option>
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
