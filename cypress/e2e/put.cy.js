/// <reference types="cypress"/>



describe('Alterar dispositivo', () => {

    //before Executa apenas 1x no começo do arquivo
    //beforeEach executa antes de cada caso de teste do arquivo

    let token = ""
    let bookingid = ""

    before('Login', () =>{ //Executa 1x antes de fazer os cenários
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/auth",
            body: {
                "username" : "admin",
                "password" : "password123"
            }

        }).then((response) => {
            expect(response.status).to.equal(200)
            token = response.body.token
            console.log("somente 1")

        })

    })

    beforeEach('Create booking', () =>{ //Executa antes de cada um dos cenários
        cy.request({
                    method: "POST",
                    url: "https://restful-booker.herokuapp.com/booking",
                    body: {
                        "firstname" : "Jim",
                        "lastname" : "Brown",
                        "totalprice" : 2000,
                        "depositpaid" : true,
                        "bookingdates" : {
                            "checkin" : "2018-01-01",
                            "checkout" : "2019-01-01"
                        },
                        "additionalneeds" : "Breakfast"
                    }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.bookingid).to.be.a('number')
            expect(response.body.booking.totalprice).to.equal(2000)
            bookingid = response.body.bookingid
            
        })
    })

    it('Alterar um dispositivo especifico', () => { //CASOS DE TESTE
        cy.request({
            method: "PUT",
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": "token="+token

            },
            body: {
                    "firstname" : "diegoo oioi",
                    "lastname" : "Brown",
                    "totalprice" : 111,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2018-01-01",
                        "checkout" : "2019-01-01"
                    },
                    "additionalneeds" : "Breakfast"
            }

        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.totalprice).to.equal(111)
        })
    })

    it('Alterar um dispositivo especifico sem token', () => { //CASOS DE TESTE
        cy.request({
            method: "PUT",
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",

            },
            body: {
                    "firstname" : "diegoo oioi",
                    "lastname" : "Brown",
                    "totalprice" : 111,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2018-01-01",
                        "checkout" : "2019-01-01"
                    },
                    "additionalneeds" : "Breakfast"
            }

        })
    })

    it('Alterar um dispositivo especifico com token inválido', () => { //CASOS DE TESTE
        cy.request({
            method: "PUT",
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false,
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": "token=oioi"
  
            },
            body: {
                    "firstname" : "diegoo oioi",
                    "lastname" : "Brown",
                    "totalprice" : 111,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2018-01-01",
                        "checkout" : "2019-01-01"
                    },
                    "additionalneeds" : "Breakfast"
            }

        })
    })
})