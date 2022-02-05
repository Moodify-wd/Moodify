from website import create_app

def main():
    app = create_app() 
    app.run(debug=True) # For development purposes

if __name__ == "__main__":
    main()