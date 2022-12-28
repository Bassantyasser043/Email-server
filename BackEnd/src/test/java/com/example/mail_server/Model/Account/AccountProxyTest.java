package com.example.mail_server.Model.Account;

import com.example.mail_server.Model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

 public class AccountProxyTest {


    @Test
    @DisplayName("check for sign up if email exists or not")
    void TestcheckEmail() throws IOException {
        AccountProxy acc = new AccountProxy();
        User user = User.getInstance();
        user.signUp("habiba","habiba@csed","123456789");
        //checkmail if mail exist will return true
        Assertions.assertFalse(acc.checkEmail("haba@csed"));
    }

    @Test
    @DisplayName("check for sign in if email exists and password")
    void TestcheckPassword() throws IOException {
        AccountProxy acc = new AccountProxy();
        User user = User.getInstance();
        user.signUp("habiba","habiba@csed","123456789");

        //Mockito.when("").thenReturn(accountTest.getEmail());
        Account accountTest = acc.checkPassword("habiba@csed","123456789");
        Assertions.assertEquals("habiba@csed",accountTest.getEmail());
        Assertions.assertEquals("123456789",accountTest.getPassword());


    }
}