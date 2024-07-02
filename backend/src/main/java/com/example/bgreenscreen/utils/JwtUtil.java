package com.example.bgreenscreen.utils;


import com.example.bgreenscreen.model.User;
import com.example.bgreenscreen.model.Role;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    
    private static final String SECRET_KEY = "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e";
   


    public String generateToken(UserDetails userDetails, String role){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("email", userDetails.getUsername());
        return generateToken(claims, userDetails);
    }
 /*   public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }*/

    /*private String generateToken(Map<String,Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 24))
        .signWith(getSigningkey(),SignatureAlgorithm.HS256).compact();
    }*/

    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
            .signWith(getSigningkey(), SignatureAlgorithm.HS256)
            .compact();
    }


    private Key getSigningkey() {
        byte[] KeyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(KeyBytes);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }



    public String extractUserName(String token) {
       return extractClaim(token, Claims::getSubject);
    }

   

    private boolean isTokenExpired(String token) {
       return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
       return extractClaim(token, Claims::getExpiration);
    }

    public <T> T  extractClaim(String token, Function< Claims, T> claimsReolvers) {
       final Claims claims = extractAllClaims(token);
       return claimsReolvers.apply(claims);
        
    }

   


    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningkey()).build().parseClaimsJws(token)
        .getBody();
    }


    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }


   
}


