import { Response } from "express";

export const serverError = (res: Response, error: any) => {
    return res.status(501).send({
        ok: false,
        message: error.toString(),
    });
};

export const success = (res: Response, data?: any, message?: string) => {
    return res.status(200).send({
        ok: true,
        mensagem: message,
        data,
    });
};

/* Este código importa um módulo "Response" do pacote "express" e define duas funções que recebem um objeto "Response", um objeto "data" e uma mensagem como parâmetros.

A primeira função é chamada "serverError" e é responsável por retornar uma resposta de erro com o código de status HTTP "501 Not Implemented". A resposta contém um 
objeto JSON com uma propriedade "ok" definida como "false" e uma mensagem de erro que é convertida para uma string usando o método "toString()".
A segunda função é chamada "success" e é responsável por retornar uma resposta de sucesso com o código de status HTTP "200 OK". A resposta contém um objeto JSON com uma 
propriedade "ok" definida como "true", uma mensagem opcional e um objeto "data" opcional que é passado como segundo parâmetro da função. Se não houver mensagem ou dados 
fornecidos, eles serão definidos como "undefined" no objeto JSON retornado.
Essas funções são úteis para retornar respostas HTTP padronizadas para o cliente, com o objetivo de facilitar o tratamento de erros e o processamento de dados em um 
aplicativo da web. */