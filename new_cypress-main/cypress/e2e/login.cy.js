import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators_/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало автотеста', function () {
        cy.visit('/'); // Зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки Забыли пароль
    });

    afterEach('Конец автотеста', function () {
         cy.get(result_page.cross).should('be.visible'); // Есть крестик и он виден для пользователей
    });

   it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти

        cy.get(result_page.tittle).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.tittle).should('be.visible'); // Текст виден пользователю
    })

       it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввели НЕверный пароль
        cy.get(main_page.login_button).click(); // Нажала войти

        cy.get(result_page.tittle).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.tittle).should('be.visible'); // Текст виден пользователю
    })

     it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolniko.ru'); // Ввели НЕверный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти

        cy.get(result_page.tittle).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.tittle).should('be.visible'); // Текст виден пользователю
    })

           it('Проверка валидации логина на @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти

        cy.get(result_page.tittle).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.tittle).should('be.visible'); // Текст виден пользователю
    })

         it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажала кнопку Забыли пароль

        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); // Ввели почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // Нажала кнопку Отправить код

        cy.get(result_page.tittle).contains('Успешно отправили пароль на e-mail'); // Проверяю, что после отправки кода вижу текст
        cy.get(result_page.tittle).should('be.visible'); // Текст виден пользователю
    })

             it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели логин с заглавными буквами
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажала войти

        cy.get(result_page.tittle).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.tittle).should('be.visible'); // Текст виден пользователю
    })
})



        




// План
// Найти поле логин и ввести верный логин
// Найти поле пароль и ввести верный пароль
// Найти кнопку войти и нажт на нее
// Провеить, что авторизация прошла успешно