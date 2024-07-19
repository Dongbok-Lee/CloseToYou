package com.example.demo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TestClassTest {

    @Test
    public void addTest() {
        TestClass testClass = new TestClass();

        int result = testClass.add(1, 1);

        Assertions.assertEquals(2, result);
    }

}