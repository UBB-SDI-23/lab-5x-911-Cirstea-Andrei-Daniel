package com.example.mpp1.Jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.mpp1.Model.User;
import com.example.mpp1.Model.UserDTO;
import com.example.mpp1.Service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Map;

import static org.springframework.security.config.Elements.JWT;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Autowired
    private UserService userService;


    public String createToken(String username) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000); // 1 hour

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return com.auth0.jwt.JWT.create()
                .withIssuer(username)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        System.out.println("Validating token: " + token);
        DecodedJWT decoded = getDecodedToken(token);
        String username = getUsernameFromToken(decoded);
        User user = userService.findByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        System.out.println(authentication.getPrincipal());

        return authentication;
    }

    public DecodedJWT getDecodedToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = com.auth0.jwt.JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    public String getUsernameFromToken(DecodedJWT decoded) {
        return decoded.getIssuer();
    }

    public Map<String, Claim> getClaimsFromToken(DecodedJWT decoded) {
        return decoded.getClaims();
    }

}
