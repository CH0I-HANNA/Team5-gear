package com.team5.gear;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories(basePackages = "com.team5.gear.repository")
//@EntityScan(basePackages = "com.team5.gear.entity")
public class GearApplication {

	public static void main(String[] args) {
		SpringApplication.run(GearApplication.class, args);
	}

}
