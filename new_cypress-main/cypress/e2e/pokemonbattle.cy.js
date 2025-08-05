describe('Автотест для ПОКЕМОНОВ', function () {

   it('Сквозной e2e тест на покупку нового аватара для своего тренера', function () {
        cy.visit('https://pokemonbattle.ru/'); // Зашли на сайт Битва покемонов
        cy.clearCookies(); // Почистили куки
        cy.get('#k_email').type('USER_LOGIN'); // Ввела верный логин
        cy.get('#k_password').type('USER_PASSWORD'); // Ввела верный пароь
        cy.get('.MuiButton-root').click(); // Нажала Войти и прошла успешно авторизацию
        cy.wait(3000);
        cy.get('.header_card_trainer').click(); // Нажала на своего тренера
        cy.wait(3000);
        cy.get('[data-qa="shop"]').click(); // Нажать кнопку смена аватара и перейти в магазин
        cy.wait(2000);
        cy.get(':nth-child(9) > .shop__button').click(); // Нажала Купить на доступном аватаре
        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4024007123874108'); // Ввела номер карты
        cy.get(':nth-child(1) > .style_1_base_input').type('05/26'); // Ввела дату действия карты
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125'); // Ввела cvv
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('Ivan Ivanov'); // Ввела имя держателя
        cy.wait(2000);
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажать кнопку Оплатить
        cy.wait(2000);
        cy.get('.style_1_base_input').type('56456'); // Ввести код из СМС
        cy.wait(2000);
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // Нажать кнопку Оплатить
        cy.wait(2000);
        cy.get('.payment_status_top_title').contains('Покупка прошла успешно'); // Проверяю, что после успешной покупки виден текст
        cy.get('.payment_status_top_title').should('be.visible'); // Текст виден пользователю
        cy.get('.payment_status_back').should('be.visible'); // Есть кнопка Вернуться в магазин
        cy.get('.style_1_base_link_blue').click(); // Нажала кнопку Вернуться в магазин 
        cy.wait(2000);
        cy.get('.header_card_trainer').click(); // Нажала на своего тренера для проверки, что аватар сменился
    })
})