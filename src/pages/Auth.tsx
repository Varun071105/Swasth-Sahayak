import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlassSurface from "@/components/GlassSurface";
import ClickSpark from "@/components/ClickSpark";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic with Supabase
    console.log("Login:", { email, password });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic with Supabase
    console.log("Signup:", { email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-4">
            <img src={logo} alt="Swasth-Sahaya Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold text-foreground">Swasth-Sahaya</span>
          </Link>
          <p className="text-muted-foreground">Your health companion</p>
        </div>

        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={12}
          className="p-1"
        >
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <CardTitle className="text-center text-foreground">Welcome</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <ClickSpark
                      sparkColor="#71B280"
                      sparkSize={8}
                      sparkRadius={15}
                      sparkCount={6}
                      duration={400}
                    >
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </ClickSpark>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <ClickSpark
                      sparkColor="#71B280"
                      sparkSize={8}
                      sparkRadius={15}
                      sparkCount={6}
                      duration={400}
                    >
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </ClickSpark>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </GlassSurface>
      </div>
    </div>
  );
};

export default Auth;